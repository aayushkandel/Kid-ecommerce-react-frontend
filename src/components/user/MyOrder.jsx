import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getOrder,
  cancleOrder,
  deleteOrder,
  getImage,
} from "../../api/apiRouter";

const MyOrder = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");


useEffect(() => {
  window.history.scrollRestoration = "manual";

  const timer = setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);

  return () => {
    clearTimeout(timer);
    window.history.scrollRestoration = "auto";
  };
}, []);

useEffect(() => {
  fetchOrders();
}, []);
  const fetchProductImages = async (ordersData) => {
    const imageData = {};


    const productIds = [
      ...new Set(
        ordersData.flatMap((order) =>
          (order.order_items || []).map((item) => item.product_id)
        )
      ),
    ];

    await Promise.all(
      productIds.map(async (productId) => {
        try {
          const response = await getImage(productId);

          const images = response.data?.images || [];
          const imagePath = images[0]?.image;

          if (imagePath) {
            imageData[productId] = imagePath.startsWith("http")
              ? imagePath
              : `http://127.0.0.1:8000/${imagePath.replace(/^\/+/, "")}`;
          } else {
            imageData[productId] = "/placeholder.png";
          }
        } catch (error) {
          console.error(
            `Error fetching image for product ${productId}:`,
            error
          );

          imageData[productId] = "/placeholder.png";
        }
      })
    );

    setProductImages(imageData);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrder();

      const ordersData = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || [];

      setOrders(ordersData);

      await fetchProductImages(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Unable to fetch your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!cancelReason.trim()) {
      alert("Please enter a cancellation reason.");
      return;
    }

    try {
      await cancleOrder({
        order_id: orderId,
        cancel_reason: cancelReason,
      });

      alert("Order cancelled successfully.");

      setCancelOrderId(null);
      setCancelReason("");

      fetchOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);

      alert(
        error.response?.data?.detail ||
          "Unable to cancel the order."
      );
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrder(orderId);

      alert("Order deleted successfully.");

      setOrders((previousOrders) =>
        previousOrders.filter((order) => order.order_id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);

      alert(
        error.response?.data?.detail ||
          "Unable to delete the order."
      );
    }
  };

  const handleCompleteOrder = (order) => {
    navigate("/checkout", {
      state: {
        order: order,
        items: [],
      },
    });
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all your orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No orders found
            </h2>

            <p className="text-gray-500 mt-2">
              You have not placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-5 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >

                {/* Order Header */}
                <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Order #{order.order_id}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on:{" "}
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyle(
                        order.order_status
                      )}`}
                    >
                      {order.order_status || "pending"}
                    </span>

                  </div>
                </div>

                {/* Order Products */}
                <div className="p-5">

                  <h3 className="text-md font-semibold text-gray-800 mb-4">
                    Products
                  </h3>

                  <div className="space-y-4">

                    {(order.order_items || []).map((item, index) => {

                      const productImage =
                        productImages[item.product_id] ||
                        "/placeholder.png";

                      const subtotal =
                        Number(item.rate || 0) *
                        Number(item.quantity || 0);

                      return (
                        <div
                          key={
                            item.id ||
                            `${order.order_id}-${item.product_id}-${item.product_variant_id || "no-variant"}-${index}`
                          }
                          className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50"
                        >

                          {/* Product Image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0">
                            <img
                              src={productImage}
                              alt={item.product_name || "Product"}
                              className="w-full h-full object-cover rounded-lg border border-gray-200 bg-white"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/placeholder.png";
                              }}
                            />
                          </div>

                          {/* Product Information */}
                          <div className="flex-1">

                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {item.product_name || "Unknown Product"}
                                </h4>

                                {item.variant_name && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    {item.variant_name}:{" "}
                                    {item.variant_value || ""}
                                  </p>
                                )}

                                {item.product_variant_id && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Variant ID: {item.product_variant_id}
                                  </p>
                                )}
                              </div>

                              <p className="font-semibold text-gray-800">
                                ${subtotal.toFixed(2)}
                              </p>

                            </div>

                            <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">

                              <p>
                                Quantity:{" "}
                                <span className="font-medium text-gray-800">
                                  {item.quantity}
                                </span>
                              </p>

                              <p>
                                Rate:{" "}
                                <span className="font-medium text-gray-800">
                                  ${Number(item.rate || 0).toFixed(2)}
                                </span>
                              </p>

                              <p>
                                Subtotal:{" "}
                                <span className="font-medium text-gray-800">
                                  ${subtotal.toFixed(2)}
                                </span>
                              </p>

                            </div>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* Order Footer */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="text-2xl font-bold text-gray-800">
                      ${Number(order.amount || 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {order.order_status?.toLowerCase() === "pending" && (
                      <>
                        <button
                          onClick={() => handleCompleteOrder(order)}
                          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                          Complete Order
                        </button>

                        <button
                          onClick={() => {
                            setCancelOrderId(order.order_id);
                            setCancelReason("");
                          }}
                          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Cancel Order
                        </button>
                      </>
                    )}

                    {order.order_status?.toLowerCase() === "cancelled" && (
                      <button
                        onClick={() => handleDeleteOrder(order.order_id)}
                        className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Delete Order
                      </button>
                    )}

                  </div>

                </div>

                {/* Cancel Reason Form */}
                {cancelOrderId === order.order_id && (
                  <div className="p-5 border-t border-gray-200 bg-red-50">

                    <h3 className="font-semibold text-gray-800 mb-3">
                      Cancel Order
                    </h3>

                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Enter cancellation reason..."
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                      rows="3"
                    />

                    <div className="flex gap-3 mt-3">

                      <button
                        onClick={() =>
                          handleCancelOrder(order.order_id)
                        }
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Confirm Cancel
                      </button>

                      <button
                        onClick={() => {
                          setCancelOrderId(null);
                          setCancelReason("");
                        }}
                        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Close
                      </button>

                    </div>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrder;
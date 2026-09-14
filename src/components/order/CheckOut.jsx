import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {orderPayment,getImage,} from "../../api/apiRouter";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;
  const checkoutItems = location.state?.items || [];

  const [productDetails, setProductDetails] = useState({});
  const [loadingImages, setLoadingImages] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load product images
  |--------------------------------------------------------------------------
  |
  | There are two possible ways we reach checkout:
  |
  | 1. Cart -> Checkout
  |    checkoutItems contains the cart information including image.
  |
  | 2. My Orders -> Complete Order -> Checkout
  |    checkoutItems is empty, so we use product_id from order.order_items
  |    and request the product image from the backend.
  |
  */

  useEffect(() => {
    const loadProductImages = async () => {
      if (!order?.order_items) {
        return;
      }

      try {
        setLoadingImages(true);

        const details = {};

        /*
         * First use images already available from Cart.
         */
        checkoutItems.forEach((item) => {
          if (item.product_id && item.image) {
            details[item.product_id] = item.image;
          }
        });

        /*
         * Get images for products that don't already have an image.
         */
        for (const item of order.order_items) {
          if (!item.product_id) {
            continue;
          }

          /*
           * If the image already came from Cart,
           * don't request it again.
           */
          if (details[item.product_id]) {
            continue;
          }

          try {
            const response = await getImage(item.product_id);

            const images = response.data?.images || [];

            if (images.length > 0 && images[0]?.image) {
              details[item.product_id] =
                `http://127.0.0.1:8000/${images[0].image}`;
            } else {
              details[item.product_id] = "/placeholder.png";
            }
          } catch (error) {
            console.error(
              `Error loading image for product ${item.product_id}:`,
              error
            );

            details[item.product_id] = "/placeholder.png";
          }
        }

        setProductDetails(details);
      } catch (error) {
        console.error("Error loading product images:", error);
      } finally {
        setLoadingImages(false);
      }
    };

    loadProductImages();
  }, [order, checkoutItems]);

  /*
  |--------------------------------------------------------------------------
  | Get cart information for an order item
  |--------------------------------------------------------------------------
  */

  const getItemDetails = (orderItem) => {
    return checkoutItems.find(
      (item) =>
        Number(item.id) === Number(orderItem.cart_id)
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Get product image
  |--------------------------------------------------------------------------
  */

  const getProductImage = (orderItem) => {
    const cartItem = getItemDetails(orderItem);

    /*
     * If checkout came from Cart,
     * use the image already present in cartItems.
     */
    if (cartItem?.image) {
      return cartItem.image;
    }

    /*
     * If checkout came from My Orders,
     * use the image loaded using product_id.
     */
    if (productDetails[orderItem.product_id]) {
      return productDetails[orderItem.product_id];
    }

    return "/placeholder.png";
  };

  /*
  |--------------------------------------------------------------------------
  | Payment
  |--------------------------------------------------------------------------
  */

  const handlePayment = async () => {
    if (!order?.order_id) {
      alert("Order information is missing.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      setPaymentLoading(true);

      const paymentData = {
        order_id: order.order_id,
        payment_method: paymentMethod,
        transaction_id: transactionId || null,
      };

      const response = await orderPayment(paymentData);

      alert(
        response.data?.message ||
          "Payment completed successfully."
      );

      navigate("/myorder");
    } catch (error) {
      console.error("Payment error:", error);

      alert(
        error.response?.data?.detail ||
          "Payment failed. Please try again."
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | No order
  |--------------------------------------------------------------------------
  */

  if (!order) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Checkout
          </h1>

          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-3">
              No order found
            </h2>

            <p className="text-gray-500 mb-6">
              Please select an order before proceeding to checkout.
            </p>

            <button
              onClick={() => navigate("/myorder")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Go to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Main checkout page
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800 font-sans">

      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ============================================================
              LEFT SIDE
          ============================================================ */}

          <div className="lg:col-span-2 space-y-8">

            {/* ORDER INFORMATION */}

            <div className="border border-gray-200 rounded-lg p-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

                <div>
                  <h2 className="text-2xl font-semibold">
                    Order #{order.order_id}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Review your order before payment.
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-medium ${
                    order.order_status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.order_status === "canceled" ||
                        order.order_status === "Canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.order_status}
                </span>

              </div>


              {/* ========================================================
                  ORDER ITEMS
              ======================================================== */}

              <div className="space-y-5">

                {order.order_items &&
                order.order_items.length > 0 ? (

                  order.order_items.map((item) => {

                    const cartItem = getItemDetails(item);

                    const productImage =
                      getProductImage(item);

                    const quantity =
                      Number(item.quantity) || 1;

                    const rate =
                      Number(item.rate) || 0;

                    const subtotal =
                      rate * quantity;

                    /*
                     * Try to get variant information from
                     * either cart data or order item.
                     */

                    const variantName =
                      item.variant_name ||
                      cartItem?.variant_name ||
                      null;

                    const variantValue =
                      item.variant_value ||
                      cartItem?.variant_value ||
                      null;

                    return (
                      <div
                        key={
                          item.order_item_id ||
                          item.id ||
                          `${item.product_id}-${item.cart_id}`
                        }
                        className="flex flex-col sm:flex-row gap-5 border border-gray-200 rounded-lg p-4"
                      >

                        {/* PRODUCT IMAGE */}

                        <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">

                          <img
                            src={productImage}
                            alt={
                              item.product_name ||
                              "Product"
                            }
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.png";
                            }}
                          />

                        </div>


                        {/* PRODUCT INFORMATION */}

                        <div className="flex-1">

                          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                            <div>

                              <h3 className="text-lg font-semibold">
                                {item.product_name ||
                                  "Product"}
                              </h3>


                              {/* VARIANT */}

                              {variantName && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {variantName}

                                  {variantValue
                                    ? ` - ${variantValue}`
                                    : ""}
                                </p>
                              )}


                              {/* QUANTITY */}

                              <p className="text-sm text-gray-500 mt-2">
                                Quantity:{" "}
                                <span className="font-medium text-gray-700">
                                  {quantity}
                                </span>
                              </p>

                            </div>


                            {/* PRICE */}

                            <div className="text-left sm:text-right">

                              <p className="text-sm text-gray-500">
                                Price
                              </p>

                              <p className="font-semibold">
                                ${rate.toFixed(2)}
                              </p>

                              <p className="text-sm text-gray-500 mt-1">
                                Subtotal
                              </p>

                              <p className="font-bold">
                                ${subtotal.toFixed(2)}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>
                    );
                  })

                ) : (

                  <div className="text-center py-8 text-gray-500">
                    No products found for this order.
                  </div>

                )}

              </div>

              {/* IMAGE LOADING MESSAGE */}

              {loadingImages && (
                <p className="text-sm text-gray-400 mt-4">
                  Loading product images...
                </p>
              )}

            </div>


            {/* ============================================================
                PAYMENT METHOD
            ============================================================ */}

            <div className="border border-gray-200 rounded-lg p-6">

              <h2 className="text-2xl font-semibold mb-6">
                Payment Method
              </h2>


              <div className="space-y-4">

                {/* ESEWA */}

                <label
                  className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
                    paymentMethod === "esewa"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment_method"
                    value="esewa"
                    checked={
                      paymentMethod === "esewa"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      eSewa
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay using eSewa
                    </p>
                  </div>

                </label>


                {/* KHALTI */}

                <label
                  className={`flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition ${
                    paymentMethod === "khalti"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment_method"
                    value="khalti"
                    checked={
                      paymentMethod === "khalti"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Khalti
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay using Khalti
                    </p>
                  </div>

                </label>

              </div>


              {/* TRANSACTION ID */}

              <div className="mt-6">

                <label className="block text-sm font-medium mb-2">
                  Transaction ID
                  <span className="text-gray-400 ml-1">
                    (optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) =>
                    setTransactionId(
                      e.target.value
                    )
                  }
                  placeholder="Enter transaction ID"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                />

              </div>

            </div>

          </div>


          {/* ============================================================
              RIGHT SIDE - ORDER SUMMARY
          ============================================================ */}

          <div>

            <div className="border border-gray-200 rounded-lg p-6 sticky top-6">

              <h2 className="text-2xl font-semibold mb-6">
                Order Summary
              </h2>


              {/* ORDER ID */}

              <div className="flex justify-between py-3 border-b border-gray-100">

                <span className="text-gray-500">
                  Order ID
                </span>

                <span className="font-medium">
                  #{order.order_id}
                </span>

              </div>


              {/* ITEMS */}

              <div className="flex justify-between py-3 border-b border-gray-100">

                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-medium">
                  {order.order_items?.length || 0}
                </span>

              </div>


              {/* STATUS */}

              <div className="flex justify-between py-3 border-b border-gray-100">

                <span className="text-gray-500">
                  Status
                </span>

                <span className="font-medium capitalize">
                  {order.order_status}
                </span>

              </div>


              {/* TOTAL */}

              <div className="flex justify-between py-5">

                <span className="text-xl font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  $
                  {Number(
                    order.amount || 0
                  ).toFixed(2)}
                </span>

              </div>


              {/* PAYMENT BUTTON */}

              <button
                onClick={handlePayment}
                disabled={
                  paymentLoading ||
                  order.order_status ===
                    "completed" ||
                  order.order_status ===
                    "canceled" ||
                  order.order_status ===
                    "Canceled"
                }
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  paymentLoading ||
                  order.order_status ===
                    "completed" ||
                  order.order_status ===
                    "canceled" ||
                  order.order_status ===
                    "Canceled"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >

                {paymentLoading
                  ? "Processing..."
                  : order.order_status ===
                    "completed"
                  ? "Order Completed"
                  : "Complete Payment"}

              </button>


              {/* BACK BUTTON */}

              <button
                onClick={() =>
                  navigate("/myorder")
                }
                className="w-full mt-3 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                My Orders
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckOut;
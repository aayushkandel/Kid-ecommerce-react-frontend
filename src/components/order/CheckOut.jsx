import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  orderPayment,
} from "../../api/apiRouter";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ==========================================
  // GET ORDER AND CART ITEMS
  // ==========================================

  const order = location.state?.order;

  const checkoutItems =
    location.state?.items || [];

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // IF NO ORDER WAS PASSED
  // ==========================================

  if (!order) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800">

        <h1 className="text-4xl font-bold mb-12 text-center">
          Checkout
        </h1>

        <div className="max-w-3xl mx-auto text-center py-20">

          <h2 className="text-2xl font-bold mb-3">
            No checkout order found
          </h2>

          <p className="text-gray-500 mb-8">
            Please go to your cart and proceed
            to checkout again.
          </p>

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Go to cart
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // GET IMAGE FOR EACH ORDER ITEM
  // ==========================================

  const getItemDetails = (orderItem) => {

    const cartItem =
      checkoutItems.find(
        (item) =>
          Number(item.id) ===
          Number(orderItem.cart_id)
      );

    return cartItem;
  };

  // ==========================================
  // PLACE ORDER / PAYMENT
  // ==========================================

  const handlePlaceOrder = async () => {

    if (!paymentMethod) {
      alert(
        "Please select a payment method."
      );
      return;
    }

    try {
      setLoading(true);

      const paymentData = {
        order_id: order.order_id,

        payment_method:
          paymentMethod,

        transaction_id: null,
      };

      const response =
        await orderPayment(
          paymentData
        );

      console.log(
        "Payment successful:",
        response.data
      );

      alert(
        "Payment successful. Your order has been placed."
      );

      // Navigate to my orders
      navigate("/my-orders");

    } catch (error) {

      console.error(
        "Payment error:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Payment failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800 font-sans">

      <h1 className="text-4xl font-bold mb-12 text-center">
        Checkout
      </h1>

      <div className="max-w-4xl mx-auto">

        <div className="border border-gray-200 rounded-lg p-8">

          {/* ==========================================
              ORDER INFORMATION
          ========================================== */}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-8">

            <div>

              <h2 className="text-xl font-bold">
                Your order
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Order #
                {order.order_id}
              </p>

            </div>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
              Pending payment
            </span>

          </div>

          {/* ==========================================
              TABLE HEADER
          ========================================== */}

          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 font-semibold text-sm">

            <div className="col-span-7">
              Product
            </div>

            <div className="col-span-2 text-center">
              Qty
            </div>

            <div className="col-span-3 text-right">
              Subtotal
            </div>

          </div>

          {/* ==========================================
              ORDER ITEMS
          ========================================== */}

          {order.order_items?.map(
            (item) => {

              const cartItem =
                getItemDetails(item);

              return (
                <div
                  key={item.cart_id}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-dashed border-gray-200 items-center"
                >

                  {/* ==========================================
                      PRODUCT IMAGE + DETAILS
                  ========================================== */}

                  <div className="col-span-7">

                    <div className="flex items-center gap-4">

                      {/* PRODUCT IMAGE */}

                      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">

                        <img
                          src={
                            cartItem?.image ||
                            "/placeholder.png"
                          }
                          alt={
                            item.product_name
                          }
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder.png";
                          }}
                        />

                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="flex flex-col">

                        <span className="font-semibold text-gray-700">
                          {item.product_name}
                        </span>

                        {/* VARIANT */}

                        {cartItem?.variant_name && (
                          <span className="text-xs text-gray-500 mt-1">

                            {cartItem.variant_name}

                            {cartItem.variant_value
                              ? ` - ${cartItem.variant_value}`
                              : ""}

                          </span>
                        )}

                        {/* RATE */}

                        <span className="text-sm text-gray-500 mt-1">
                          Rate: Rs{" "}
                          {Number(
                            item.rate
                          ).toFixed(2)}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ==========================================
                      QUANTITY
                  ========================================== */}

                  <div className="col-span-2 text-center text-gray-600">
                    {item.quantity}
                  </div>

                  {/* ==========================================
                      SUBTOTAL
                  ========================================== */}

                  <div className="col-span-3 text-right text-gray-600">

                    Rs{" "}
                    {(
                      Number(
                        item.rate
                      ) *
                      Number(
                        item.quantity
                      )
                    ).toFixed(2)}

                  </div>

                </div>
              );
            }
          )}

          {/* ==========================================
              TOTAL
          ========================================== */}

          <div className="py-6 border-b border-dashed border-gray-200">

            <div className="flex justify-between mb-4 text-gray-600 font-semibold">

              <span>
                Subtotal
              </span>

              <span>
                Rs{" "}
                {Number(
                  order.amount || 0
                ).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between text-gray-900 font-bold text-lg">

              <span>
                Total
              </span>

              <span>
                Rs{" "}
                {Number(
                  order.amount || 0
                ).toFixed(2)}
              </span>

            </div>

          </div>

          {/* ==========================================
              PAYMENT METHOD
          ========================================== */}

          <div className="py-6 border-b border-dashed border-gray-200">

            <label
              htmlFor="paymentMethod"
              className="block text-sm font-bold text-gray-700 mb-4"
            >
              Payment method{" "}

              <span className="text-red-500">
                *
              </span>
            </label>

            <div className="relative">

              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-colors font-medium"
              >

                <option value="">
                  Select a payment method
                </option>

                <option value="esewa">
                  eSewa
                </option>

                <option value="khalti">
                  Khalti
                </option>

              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">

                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>

            </div>

          </div>

          {/* ==========================================
              PLACE ORDER
          ========================================== */}

          <div className="pt-6">

            <button
              onClick={
                handlePlaceOrder
              }
              disabled={
                !paymentMethod ||
                loading
              }
              className={`w-full font-bold py-4 rounded-md transition-colors text-center focus:outline-none ${
                !paymentMethod ||
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >

              {loading
                ? "Processing payment..."
                : "Place order"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckOut;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {getCart,updateCart,deleteCart,getOneProduct,getImage,getProductRate,createOrder,getOrder,} from "../../api/apiRouter";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // ==========================================
  // FETCH CART
  // ==========================================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      const carts = response.data || [];

      const detailedCartItems = await Promise.all(
        carts.map(async (cart) => {
          try {
            // ==========================================
            // GET PRODUCT
            // ==========================================

            const productResponse = await getOneProduct(
              cart.product_id
            );

            const product = productResponse.data;

            // ==========================================
            // GET PRODUCT IMAGES
            // ==========================================

            let images = [];

            try {
              const imageResponse = await getImage(
                cart.product_id
              );

              images = imageResponse.data.images || [];
            } catch (error) {
              console.log(
                `No image found for product ${cart.product_id}`
              );
            }

            // ==========================================
            // GET VARIANT
            // ==========================================

            let selectedVariant = null;

            if (
              cart.product_variant_id !== null &&
              cart.product_variant_id !== undefined
            ) {
              try {
                const rateResponse = await getProductRate(
                  cart.product_id
                );

                const rateData = rateResponse.data;

                const variants =
                  rateData.product_variants || [];

                selectedVariant = variants.find(
                  (variant) =>
                    Number(
                      variant.product_variant_id
                    ) ===
                    Number(cart.product_variant_id)
                );
              } catch (error) {
                console.log(
                  `No variant rate found for product ${cart.product_id}`
                );
              }
            }

            // ==========================================
            // PRICE
            // ==========================================

            const price =
              selectedVariant?.product_rate ??
              product.price ??
              0;

            // ==========================================
            // STOCK
            // ==========================================

            const stockLevel =
              selectedVariant?.product_stock_level ??
              product.stock_level ??
              0;

            // ==========================================
            // IMAGE
            // ==========================================

            const image =
              images.length > 0
                ? `/api/${images[0].image}`
                : "/placeholder.png";

            return {
              ...cart,

              name: product.name,

              price: Number(price),

              stock_level: Number(stockLevel),

              image: image,

              variant_name:
                selectedVariant?.product_variant_name ||
                null,

              variant_value:
                selectedVariant?.product_variant_value ||
                null,
            };
          } catch (error) {
            console.error(
              `Error fetching product ${cart.product_id}:`,
              error
            );

            return {
              ...cart,

              name: "Product unavailable",

              price: 0,

              stock_level: 0,

              image: "/placeholder.png",

              variant_name: null,

              variant_value: null,
            };
          }
        })
      );

      setCartItems(detailedCartItems);

      setOriginalItems(detailedCartItems);

      setHasChanges(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setCartItems([]);
        setOriginalItems([]);
      } else {
        console.error(
          "Error fetching cart:",
          error
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ==========================================
  // UPDATE QUANTITY LOCALLY
  // ==========================================

  const updateQuantity = (id, change) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const newQuantity = Math.max(
          1,
          item.quantity + change
        );

        if (
          item.stock_level !== undefined &&
          newQuantity > item.stock_level
        ) {
          return item;
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );

    setHasChanges(true);
  };

  // ==========================================
  // UPDATE CART IN DATABASE
  // ==========================================

  const handleUpdateCart = async () => {
    try {
      setUpdating(true);

      for (const item of cartItems) {
        const originalItem = originalItems.find(
          (original) =>
            original.id === item.id
        );

        if (
          originalItem &&
          originalItem.quantity !== item.quantity
        ) {
          await updateCart(item.id, {
            product_id: item.product_id,
            product_variant_id:
              item.product_variant_id,
            quantity: item.quantity,
          });
        }
      }

      await fetchCart();
    } catch (error) {
      console.error(
        "Error updating cart:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to update cart."
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // DELETE CART ITEM
  // ==========================================

  const handleDeleteCart = async (id) => {
    try {
      setDeletingId(id);

      await deleteCart(id);

      setCartItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== id
        )
      );

      setOriginalItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== id
        )
      );

      setHasChanges(false);
    } catch (error) {
      console.error(
        "Error deleting cart item:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to delete cart item."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // CREATE ORDER AND GO TO CHECKOUT
  // ==========================================

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setCreatingOrder(true);

      // ==========================================
      // SAVE QUANTITY CHANGES FIRST
      // ==========================================

      if (hasChanges) {
        for (const item of cartItems) {
          const originalItem = originalItems.find(
            (original) =>
              original.id === item.id
          );

          if (
            originalItem &&
            originalItem.quantity !== item.quantity
          ) {
            await updateCart(item.id, {
              product_id: item.product_id,
              product_variant_id:
                item.product_variant_id,
              quantity: item.quantity,
            });
          }
        }
      }

      // ==========================================
      // CREATE ORDER
      // ==========================================

      const response = await createOrder();

      const order = response.data;

      console.log(
        "Order created:",
        order
      );

      // ==========================================
      // FIND ONLY ITEMS INCLUDED IN THIS ORDER
      // ==========================================

      const orderedCartIds = new Set(
        (order.order_items || []).map(
          (item) => Number(item.cart_id)
        )
      );

      const checkoutItems =
        cartItems.filter((item) =>
          orderedCartIds.has(
            Number(item.id)
          )
        );

      // ==========================================
      // SEND ORDER + PRODUCT DETAILS + IMAGES
      // ==========================================

      navigate("/checkout", {
        state: {
          order: order,
          items: checkoutItems,
        },
      });

    } catch (error) {
      console.error(
        "Error creating order:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to create order."
      );
    } finally {
      setCreatingOrder(false);
    }
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const getSubtotal = (item) => {
    return (
      Number(item.price || 0) *
      Number(item.quantity || 0)
    );
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total + getSubtotal(item),
    0
  );

  const freeShippingAmount = 200;

  const remainingAmount = Math.max(
    0,
    freeShippingAmount - cartSubtotal
  );

  const shippingProgress = Math.min(
    100,
    (cartSubtotal /
      freeShippingAmount) *
      100
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-12">
          Cart
        </h1>

        <p className="text-gray-500">
          Loading cart...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 text-gray-800 font-sans">

      <h1 className="text-4xl font-bold mb-12">
        Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20">

          <h2 className="text-2xl font-bold mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500">
            Add products to your cart to see
            them here.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ==========================================
              LEFT COLUMN
          ========================================== */}

          <div className="lg:col-span-2">

            {/* TABLE HEADER */}

            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 font-semibold text-sm">

              <div className="col-span-6 md:col-span-5">
                Product
              </div>

              <div className="col-span-3 md:col-span-4 text-center">
                Quantity
              </div>

              <div className="col-span-3 text-right">
                Subtotal
              </div>

            </div>

            {/* CART ITEMS */}

            <div className="flex flex-col">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 py-8 border-b border-dashed border-gray-200 items-center"
                >

                  {/* PRODUCT */}

                  <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-4 md:mb-0">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.png";
                      }}
                    />

                    <div className="flex flex-col">

                      <span className="font-semibold text-gray-700">
                        {item.name}
                      </span>

                      <span className="text-gray-500">
                        Rs{" "}
                        {Number(
                          item.price
                        ).toFixed(2)}
                      </span>

                      {item.variant_name && (
                        <span className="text-xs text-gray-400">
                          {item.variant_name}

                          {item.variant_value
                            ? ` - ${item.variant_value}`
                            : ""}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* QUANTITY */}

                  <div className="col-span-6 md:col-span-4 flex justify-start md:justify-center">

                    <div className="flex border border-gray-300 rounded-md overflow-hidden h-10 w-24">

                      <div className="flex-1 flex items-center justify-center font-medium select-none">
                        {item.quantity}
                      </div>

                      <div className="w-6 flex flex-col border-l border-gray-300">

                        {/* INCREMENT */}

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              1
                            )
                          }
                          disabled={
                            item.stock_level !==
                              undefined &&
                            item.quantity >=
                              item.stock_level
                          }
                          className="flex-1 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 0L0 6H10L5 0Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>

                        {/* DECREMENT */}

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              -1
                            )
                          }
                          disabled={
                            item.quantity <= 1
                          }
                          className="flex-1 flex items-center justify-center bg-gray-500 text-white hover:bg-gray-600 transition-colors border-t border-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 6L0 0H10L5 6Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* SUBTOTAL */}

                  <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-6">

                    <span className="text-gray-600">
                      Rs{" "}
                      {getSubtotal(
                        item
                      ).toFixed(2)}
                    </span>

                    <button
                      onClick={() =>
                        handleDeleteCart(
                          item.id
                        )
                      }
                      disabled={
                        deletingId ===
                        item.id
                      }
                      className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      aria-label="Delete item"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line
                          x1="10"
                          y1="11"
                          x2="10"
                          y2="17"
                        ></line>
                        <line
                          x1="14"
                          y1="11"
                          x2="14"
                          y2="17"
                        ></line>
                      </svg>
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* COUPON AND UPDATE */}

            <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              <div className="flex w-full md:w-auto gap-4">

                <input
                  type="text"
                  placeholder="Coupon code"
                  className="bg-gray-50 border border-gray-100 rounded-md px-4 py-3 flex-1 md:w-64 outline-none focus:border-gray-300 transition-colors"
                />

                <button className="bg-gray-900 text-white font-semibold rounded-md px-6 py-3 hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Apply coupon
                </button>

              </div>

              <button
                onClick={
                  handleUpdateCart
                }
                disabled={
                  !hasChanges ||
                  updating
                }
                className={`font-semibold rounded-md px-6 py-3 transition-colors w-full md:w-auto ${
                  hasChanges
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {updating
                  ? "Updating..."
                  : "Update cart"}
              </button>

            </div>

          </div>

          {/* ==========================================
              RIGHT COLUMN
          ========================================== */}

          <div className="lg:col-span-1">

            <div className="border border-gray-200 rounded-lg p-8">

              <h2 className="text-xl font-bold mb-8">
                Cart totals
              </h2>

              <div className="flex justify-between mb-4 text-gray-500">

                <span>
                  Subtotal
                </span>

                <span>
                  Rs{" "}
                  {cartSubtotal.toFixed(2)}
                </span>

              </div>

              <div className="border-b border-dashed border-gray-200 my-6"></div>

              <div className="flex justify-between mb-8 text-lg font-bold text-gray-900">

                <span>
                  Total
                </span>

                <span>
                  Rs{" "}
                  {cartSubtotal.toFixed(2)}
                </span>

              </div>

              {/* FREE SHIPPING */}

              <div className="mb-8">

                {remainingAmount > 0 ? (

                  <p className="text-gray-500 text-sm mb-3">
                    Add Rs{" "}
                    {remainingAmount.toFixed(
                      2
                    )}{" "}
                    more to get free shipping!
                  </p>

                ) : (

                  <p className="text-green-600 text-sm mb-3 font-medium">
                    You qualify for free
                    shipping!
                  </p>

                )}

                <div className="h-1.5 bg-gray-200 rounded-full w-full overflow-hidden">

                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{
                      width: `${shippingProgress}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={
                  handleProceedToCheckout
                }
                disabled={creatingOrder}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-md hover:bg-gray-800 transition-colors text-center focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {creatingOrder
                  ? "Creating order..."
                  : "Proceed to checkout"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;
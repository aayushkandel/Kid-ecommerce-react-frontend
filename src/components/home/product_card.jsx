import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

import {
  createCart,
  getCart,
} from "../../api/apiRouter";

import Compare from "../cart_buttons/compare";
import View from "../cart_buttons/view";
import WishList from "../cart_buttons/wishList";

import LoginForm from "../user/LoginForm";

function ProductCard({
  id,
  name,
  category,
  price,
  image,
  productVariants = [],
}) {
  const navigate = useNavigate();

  const [isAddedToCart, setIsAddedToCart] =
    useState(false);

  const [addingToCart, setAddingToCart] =
    useState(false);

  const [isLoginOpen, setIsLoginOpen] =
    useState(false);

  // ==========================================
  // CHECK WHETHER PRODUCT IS ALREADY IN CART
  // ==========================================

  const checkCartStatus = async () => {
    const token = localStorage.getItem("token");

    // User not logged in
    if (!token) {
      setIsAddedToCart(false);
      return;
    }

    try {
      const response = await getCart();

      console.log(
        "Cart response:",
        response.data
      );

      // ==========================================
      // GET CART ITEMS
      // ==========================================

      let cartItems = [];

      if (Array.isArray(response.data)) {
        cartItems = response.data;
      } else if (
        Array.isArray(response.data?.cart)
      ) {
        cartItems = response.data.cart;
      } else if (
        Array.isArray(response.data?.items)
      ) {
        cartItems = response.data.items;
      } else if (
        Array.isArray(response.data?.data)
      ) {
        cartItems = response.data.data;
      }

      console.log(
        "Product card cart items:",
        cartItems
      );

      // ==========================================
      // PRODUCT CARD
      //
      // We only know the product ID here.
      // The variant will be selected on
      // ProductDetails.
      // ==========================================

      const productInCart = cartItems.some(
        (cartItem) =>
          Number(cartItem.product_id) ===
          Number(id)
      );

      setIsAddedToCart(productInCart);

    } catch (error) {
      console.error(
        "Error checking cart:",
        error
      );

      setIsAddedToCart(false);
    }
  };

  // ==========================================
  // CHECK CART WHEN COMPONENT LOADS
  // ==========================================

  useEffect(() => {
    checkCartStatus();
  }, [id]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async (e) => {
    // Prevent NavLink underneath the button
    e.preventDefault();
    e.stopPropagation();

    // ==========================================
    // CHECK LOGIN
    // ==========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoginOpen(true);
      return;
    }

    // ==========================================
    // IF ALREADY IN CART
    // ==========================================

    if (isAddedToCart) {
      navigate("/cart");
      return;
    }

    try {
      setAddingToCart(true);

      // ==========================================
      // CREATE CART DATA
      // ==========================================

      const cartData = {
        product_id: id,

        // ProductCard doesn't have a selected
        // variant, so keep it null.
        product_variant_id: null,

        quantity: 1,
      };

      console.log(
        "Creating cart from ProductCard:",
        cartData
      );

      const response =
        await createCart(cartData);

      console.log(
        "Cart created:",
        response.data
      );

      // ==========================================
      // UPDATE BUTTON
      // ==========================================

      setIsAddedToCart(true);

    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );

      if (error.response) {
        console.error(
          "Backend error:",
          error.response.data
        );
      }

    } finally {
      setAddingToCart(false);
    }
  };

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  const handleLoginSuccess = async () => {
    setIsLoginOpen(false);

    // Check again after login
    await checkCartStatus();
  };

  return (
    <>
      <div
        className="group relative border border-gray-200 rounded-2xl flex flex-col hover:shadow-lg transition-shadow duration-300"
      >

        {/* ==========================================
            ICONS
        ========================================== */}

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">

          <WishList />

          <Compare />

          <View />

        </div>


        {/* ==========================================
            IMAGE
        ========================================== */}

        <div
          className="overflow-hidden rounded-t-2xl h-56 w-full flex items-center justify-center p-6"
        >

          <img
            src={
              image
                ? `http://127.0.0.1:8000/${image}`
                : "/placeholder.png"
            }
            alt={name}
            className="w-full h-50 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />

        </div>


        {/* ==========================================
            PRODUCT INFO
        ========================================== */}

        <div
          className="flex-1 flex flex-col items-center text-center px-4 pb-4"
        >

          <h3 className="font-bold text-slate-900">
            {name}
          </h3>

          <p className="text-xs text-gray-400 tracking-wide mt-1">
            {category}
          </p>

        </div>


        {/* ==========================================
            PRICE / ADD TO CART
        ========================================== */}

        <div
          className="relative z-10 flex items-center justify-between border-t border-gray-200 px-5 py-4"
        >

          <span className="font-bold text-slate-900">
            Rs {price}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className={`text-sm font-semibold cursor-pointer transition-colors ${
              addingToCart
                ? "text-gray-400 cursor-not-allowed"
                : isAddedToCart
                ? "text-amber-500 hover:text-amber-600"
                : "text-slate-700 hover:text-yellow-400"
            }`}
          >

            {addingToCart
              ? "Adding..."
              : isAddedToCart
              ? "View Cart"
              : "Add to cart"}

          </button>

        </div>


        {/* ==========================================
            PRODUCT DETAILS LINK
        ========================================== */}

        <NavLink
          to={`/product_details/${id}`}
          className="absolute inset-0 z-0"
        />

      </div>


      {/* ==========================================
          LOGIN MODAL
      ========================================== */}

      <LoginForm
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        onRegister={() => {
          setIsLoginOpen(false);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

    </>
  );
}

export default ProductCard;
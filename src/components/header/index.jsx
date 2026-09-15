import { NavLink, useNavigate, useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

import { getCart } from "../../api/apiRouter";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [username, setUsername] = useState(
    localStorage.getItem("username") || "",
  );

  // ============================
  // CART STATE
  // ============================

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // ============================
  // FETCH CART TOTAL AND COUNT
  // ============================

  const fetchCartSummary = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      setCartTotal(0);
      return;
    }

    try {
      const response = await getCart();
      const carts = response.data || [];

      // Number of cart records, not total quantity
      setCartCount(carts.length);

      const total = carts.reduce((sum, item) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 0);

        return sum + price * quantity;
      }, 0);

      setCartTotal(total);
    } catch (error) {
      console.error("Error fetching cart summary:", error);
    }
  };

  useEffect(() => {
    fetchCartSummary();

    const handleCartUpdated = () => {
      fetchCartSummary();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  // ============================
  // LOGIN CHECK
  // ============================

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      setIsLoggedIn(!!token);
      setUsername(storedUsername || "");

      fetchCartSummary();
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  // ============================
  // FETCH CART WHEN HEADER LOADS
  // ============================

  useEffect(() => {
    fetchCartSummary();
  }, []);

  // ============================
  // LISTEN FOR CART UPDATES
  // ============================

  useEffect(() => {
    const updateCartSummary = () => {
      fetchCartSummary();
    };

    window.addEventListener("cartUpdated", updateCartSummary);

    return () => {
      window.removeEventListener("cartUpdated", updateCartSummary);
    };
  }, []);

  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");

    // Clear cart information in header
    setCartCount(0);
    setCartTotal(0);

    console.log("User logged out");
  };

  // ============================
  // LOGIN SUCCESS
  // ============================

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    setIsLoggedIn(!!token);
    setUsername(storedUsername || "");

    // Fetch cart after login
    fetchCartSummary();
  };

  //Search handler
  
  const handleSearchChange = (e) => {
  const value = e.target.value;

  setSearchValue(value);

  if (value.trim() !== "") {
    // Save the page where search started
    if (!location.pathname.startsWith("/search")) {
      sessionStorage.setItem(
        "searchFrom",
        location.pathname + location.search
      );
    }

    navigate(`/search?query=${encodeURIComponent(value)}`);
  } else {
    // Return to original page
    const previousPage =
      sessionStorage.getItem("searchFrom") || "/";

    sessionStorage.removeItem("searchFrom");

    navigate(previousPage);
  }
};

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  setSearchValue(query);
}, [location.search]);

  return (
    <>
      {/* ============================
          TOP HEADER
      ============================ */}

      <div className="w-full h-20 flex justify-between">
        {/* Logo */}
        <div className="w-1/4">
          <img src="/src/assets/logo.svg" className="h-25 w-25" alt="" />
        </div>

        {/* Search */}
        {/* Search */}
<div className="w-2/4 flex flex-col justify-center items-center">
  <div className="w-[90%] h-[50%] rounded-xl bg-gray-200 flex justify-between p-4">

    {/* Search Input */}
    <div className="w-3/5 flex items-center">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="What are you looking for?"
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
      />
    </div>

    <div className="flex w-2/5 gap-5 justify-end">

      {/* Category Dropdown */}
     
      {/* Search Icon */}
      <button
        type="button"
        onClick={() => {
          if (searchValue.trim()) {
            navigate(
              `/search?query=${encodeURIComponent(searchValue)}`
            );
          }
        }}
        className="flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 1 1.415-1.414l-3.85-3.85a1 1 0 0 1-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>

    </div>
  </div>
</div>

        {/* Phone */}
        <div className="w-1/4 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 border rounded-3xl p-1 border-gray-200 shadow-m">
            <div className="bg-black p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-telephone-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
            </div>

            <div className="p-1">+977 9844208213</div>
          </div>
        </div>
      </div>

      {/* ============================
          NAVBAR
      ============================ */}

      <div className="flex w-full h-20">
        {/* Main nav */}
        <div className="flex justify-start items-center gap-5 w-1/2">
          <NavLink
            to="/"
            id="home"
            className="nav-link hover:border-b-green-700 border-b-green-700 h-full border-b-2 border-transparent p-5 py-6 transition-all duration-300 ease-in-out"
          >
            HOME
          </NavLink>

          <NavLink
            to="/shop"
            id="shop"
            className="flex gap-2 items-center nav-link hover:border-b-green-700 target:border-green-700 h-full border-b-2 border-transparent p-5 py-6 transition-all duration-300 ease-in-out"
          >
            SHOP
            <svg
              className="bi bi-chevron-down flex items-center justify-center mt-1"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </NavLink>

          <NavLink
            to="/news"
            id="news"
            className="nav-link hover:border-b-green-700 target:border-green-700 h-full border-b-2 border-transparent p-5 py-6 transition-all duration-300 ease-in-out"
          >
            NEWS
          </NavLink>

          <NavLink
            to="/about"
            id="about"
            className="nav-link hover:border-b-green-700 target:border-green-700 h-full border-b-2 border-transparent p-5 py-6 transition-all duration-300 ease-in-out"
          >
            ABOUT US
          </NavLink>

          <NavLink
            to="/contact"
            id="contact"
            className="nav-link hover:border-b-green-700 target:border-green-700 h-full border-b-2 border-transparent p-5 py-6 transition-all duration-300 ease-in-out"
          >
            CONTACT US
          </NavLink>
        </div>

        {/* ============================
            RIGHT NAV
        ============================ */}

        <div className="flex justify-end gap-10 items-center w-1/2">
          {/* Compare */}
          <a href="#">
            <div className="flex items-center gap-3 font-semibold text-gray-700 hover:text-yellow-400 transition-colors duration-100">
              <svg
                className="ct-icon"
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
              >
                <path d="M7.5 6c-.1.5-.2 1-.3 1.4 0 .6-.1 1.3-.3 2-.2.7-.5 1.4-1 1.9-.5.6-1.3.9-2.2.9H0v-1.4h3.7c.6 0 .9-.2 1.2-.5.3-.3.5-.7.7-1.3.1-.5.2-1 .3-1.6v-.3c0-.5.1-1 .3-1.5.2-.7.5-1.4 1-1.9.5-.6 1.3-.9 2.2-.9h3l-1.6-1.6 1-1L15 3.5l-3.3 3.3-1-1 1.6-1.6h-3c-.6 0-1.2.2-1.2.5-.2.4-.4.9-.6 1.3.5.4 1.1.6 1.8.6h3l-1.6 1.6 1 1z" />
              </svg>
              COMPARE
            </div>
          </a>

          {/* Wishlist */}
          <a href="#">
            <div className="flex items-center gap-3 font-semibold text-gray-700 hover:text-yellow-400 transition-colors duration-100">
              <svg
                className="ct-icon"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
              >
                <path d="M7.5,13.9l-0.4-0.3c-0.2-0.2-4.6-3.5-5.8-4.8C0.4,7.7-0.1,6.4,0,5.1c0.1-1.2,0.7-2.2,1.6-3c0.9-0.8,2.3-1,3.6-0.8C6.1,1.5,6.9,2,7.5,2.6c0.6-0.6,1.4-1.1,2.4-1.3c1.3-0.2,2.6,0,3.5,0.8l0,0c0.9,0.7,1.5,1.8,1.6,3c0.1,1.3-0.3,2.6-1.3,3.7c-1.2,1.4-5.6,4.7-5.7,4.8L7.5,13.9z" />
              </svg>
              WISHLIST
            </div>
          </a>

          {/* ============================
              CART
          ============================ */}

          <NavLink to="/cart">
            <div className="flex items-center gap-3 font-semibold text-gray-700 hover:text-yellow-400 transition-colors duration-100 relative">
              {/* Cart Icon + Badge */}
              <div className="relative">
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="currentColor"
                >
                  <path d="M14.1,1.6C14,0.7,13.3,0,12.4,0H2.7C1.7,0,1,0.7,0.9,1.6L0.1,13.1c0,0.5,0.1,1,0.5,1.3C0.9,14.8,1.3,15,1.8,15h11.4c0.5,0,0.9-0.2,1.3-0.6c0.3-0.4,0.5-0.8,0.5-1.3L14.1,1.6z" />
                </svg>

                {/* CART NOTIFICATION BADGE */}

                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>
              {/* CART TOTAL */}
              Rs {cartTotal.toFixed(2)}
            </div>
          </NavLink>

          {/* Login / Profile + Logout */}

          {!isLoggedIn ? (
            <div
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-3 font-semibold text-gray-700 hover:text-yellow-400 transition-colors duration-100 cursor-pointer"
            >
              <svg
                className="ct-icon"
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
              >
                <path d="M10.5,9h-6c-2.1,0-3.8,1.7-3.8,3.8v1.5c0,0.4.3.8.8.8s.8-.3.8-.8v-1.5c0-1.2,1-2.2,2.2-2.2h6c1.2,0,2.2,1,2.2,2.2v1.5c0,0.4.3.8.8.8s.8-.3.8-.8v-1.5C14.2,10.7,12.6,9,10.5,9zM7.5,7C9.4,7,11,5.4,11,3.5S9.4,0,7.5,0S4,1.6,4,3.5S5.6,7,7.5,7zM7.5,1.5c1.1,0,2,0.9,2,2s-.9,2-2,2s-2-.9-2-2s.9-2,2-2z" />
              </svg>
              LOGIN
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Logout */}
              <div
                onClick={handleLogout}
                className="font-semibold text-gray-700 hover:text-yellow-400 transition-colors duration-100 cursor-pointer"
              >
                LOGOUT
              </div>

              {/* Profile circle */}
              <div
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold uppercase"
                title={username}
              >
                {username ? username.charAt(0) : "U"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Login Form */}

      <LoginForm
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        onRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Form */}

      <RegisterForm
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        onBackToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}

export default Header;

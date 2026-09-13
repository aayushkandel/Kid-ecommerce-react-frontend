import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getOneProduct,
  getImage,
  getProductRate,
  createCart,
  getCart,
} from "../../../api/apiRouter";
import LoginForm from "../../../components/user/LoginForm";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const [productRate, setProductRate] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // ==========================================
  // CHECK WHETHER CURRENT PRODUCT/VARIANT
  // IS ALREADY IN CART
  // ==========================================

  const checkCartStatus = async (
    productId,
    variantId = null,
    productHasVariants = false
  ) => {
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      setIsAddedToCart(false);
      return;
    }

    try {
      const response = await getCart();

      console.log("Cart response:", response.data);

      // ==========================================
      // GET CART ITEMS
      // ==========================================

      let cartItems = [];

      if (Array.isArray(response.data)) {
        cartItems = response.data;
      } else if (Array.isArray(response.data?.cart)) {
        cartItems = response.data.cart;
      } else if (Array.isArray(response.data?.items)) {
        cartItems = response.data.items;
      } else if (Array.isArray(response.data?.data)) {
        cartItems = response.data.data;
      }

      console.log("Cart items:", cartItems);

      // ==========================================
      // PRODUCT WITHOUT VARIANTS
      // ==========================================

      if (!productHasVariants) {
        const productInCart = cartItems.some(
          (cartItem) =>
            Number(cartItem.product_id) === Number(productId)
        );

        console.log(
          "Product without variant in cart:",
          productInCart
        );

        setIsAddedToCart(productInCart);

        return;
      }

      // ==========================================
      // PRODUCT WITH VARIANTS
      // ==========================================

      if (variantId === null || variantId === undefined) {
        setIsAddedToCart(false);
        return;
      }

      const variantInCart = cartItems.some(
        (cartItem) =>
          Number(cartItem.product_id) === Number(productId) &&
          Number(cartItem.product_variant_id) === Number(variantId)
      );

      console.log(
        "Selected variant in cart:",
        variantInCart
      );

      setIsAddedToCart(variantInCart);
    } catch (error) {
      console.error("Error checking cart:", error);

      setIsAddedToCart(false);
    }
  };

  // ==========================================
  // FETCH PRODUCT DETAILS
  // ==========================================

  const getProductDetails = async () => {
    try {
      setLoading(true);

      // ==========================================
      // GET PRODUCT
      // ==========================================

      const productResponse = await getOneProduct(id);
      const productData = productResponse.data;

      setProduct(productData);

      console.log("Product:", productData);

      // ==========================================
      // GET PRODUCT IMAGES
      // ==========================================

      try {
        const imageResponse = await getImage(id);

        setImages(imageResponse.data.images || []);

        console.log("Images:", imageResponse.data);
      } catch (error) {
        console.log("No images found");
        setImages([]);
      }

      // ==========================================
      // GET PRODUCT RATE AND VARIANTS
      // ==========================================

      try {
        const rateResponse = await getProductRate(id);

        const rateData = rateResponse.data;

        console.log(
          "Product Rate API Response:",
          rateData
        );

        const variants = rateData.product_variants || [];

        console.log("All Variants:", variants);

        const validVariants = variants.filter(
          (variant) =>
            variant.product_variant_id !== null &&
            variant.product_variant_id !== undefined
        );

        console.log(
          "Valid Variants:",
          validVariants
        );

        if (validVariants.length > 0) {
          setProductRate(rateData);

          // Select first variant automatically
          setSelectedVariant(validVariants[0]);
        } else {
          setProductRate(null);
          setSelectedVariant(null);

          console.log(
            "No variants found for this product"
          );
        }
      } catch (error) {
        // No product rates/variants
        console.log(
          "No product variants found"
        );

        setProductRate(null);
        setSelectedVariant(null);
      }
    } catch (error) {
      console.error(
        "Error fetching product details:",
        error
      );

      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RUN WHEN PRODUCT ID CHANGES
  // ==========================================

  useEffect(() => {
    window.scrollTo(0, 0);

    setIsAddedToCart(false);
    setSelectedVariant(null);
    setProductRate(null);
    setQuantity(1);

    getProductDetails();
  }, [id]);

  // ==========================================
  // GET ALL VALID VARIANTS
  // ==========================================

  const variants =
    productRate?.product_variants?.filter(
      (variant) =>
        variant.product_variant_id !== null &&
        variant.product_variant_id !== undefined
    ) || [];

  // ==========================================
  // CHECK IF PRODUCT HAS VARIANTS
  // ==========================================

  const hasVariants = variants.length > 0;

  // ==========================================
  // CHECK CART AFTER PRODUCT/VARIANT IS READY
  // ==========================================

  useEffect(() => {
    if (!product) {
      return;
    }

    const variantId =
      selectedVariant?.product_variant_id ?? null;

    checkCartStatus(
      product.id,
      variantId,
      hasVariants
    );
  }, [
    product,
    selectedVariant,
    hasVariants,
  ]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Product not found.
        </p>
      </div>
    );
  }

  // ==========================================
  // PRODUCT IMAGE
  // ==========================================

  const productImage =
    images.length > 0
      ? `http://127.0.0.1:8000/${images[0].image}`
      : "/placeholder.png";

  // ==========================================
  // CURRENT PRICE
  // ==========================================

  const currentRate =
    selectedVariant?.product_rate ??
    selectedVariant?.rate ??
    product.price;

  // ==========================================
  // CURRENT STOCK
  // ==========================================

  const currentStock =
    selectedVariant?.product_stock_level ??
    selectedVariant?.stock_level ??
    product.stock_level;

  // ==========================================
  // CHANGE VARIANT
  // ==========================================

  const handleVariantChange = async (e) => {
    const variantId = Number(e.target.value);

    const variant = variants.find(
      (item) =>
        Number(item.product_variant_id) ===
        variantId
    );

    setSelectedVariant(variant || null);

    setQuantity(1);

    // ==========================================
    // CHECK WHETHER THIS SPECIFIC VARIANT
    // IS ALREADY IN CART
    // ==========================================

    if (variant) {
      await checkCartStatus(
        product.id,
        variant.product_variant_id,
        true
      );
    } else {
      setIsAddedToCart(false);
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = () => {
    setQuantity((q) => {
      if (q < currentStock) {
        return q + 1;
      }

      return q;
    });
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = () => {
    setQuantity((q) => {
      if (q > 1) {
        return q - 1;
      }

      return 1;
    });
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
    // ==========================================
    // CHECK STOCK
    // ==========================================

    if (currentStock <= 0) {
      return;
    }

    // ==========================================
    // CHECK LOGIN
    // ==========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoginOpen(true);
      return;
    }

    // ==========================================
    // IF CURRENT PRODUCT/VARIANT IS ALREADY
    // IN CART -> GO TO CART
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
        product_id: product.id,

        product_variant_id:
          hasVariants && selectedVariant
            ? selectedVariant.product_variant_id
            : null,

        quantity: quantity,
      };

      console.log(
        "Creating cart:",
        cartData
      );

      const response =
        await createCart(cartData);

      console.log(
        "Cart created:",
        response.data
      );

      // ==========================================
      // AFTER SUCCESSFUL ADD
      // ==========================================

      setIsAddedToCart(true);
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      if (error.response) {
        console.error(
          error.response.data
        );
      }
    } finally {
      setAddingToCart(false);
    }
  };

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleLoginSuccess = async () => {
    const token = localStorage.getItem("token");
    const storedUsername =
      localStorage.getItem("username");

    setIsLoggedIn(!!token);
    setUsername(storedUsername || "");

    setIsLoginOpen(false);

    // ==========================================
    // AFTER LOGIN CHECK CURRENT PRODUCT/
    // VARIANT IN CART
    // ==========================================

    if (product) {
      await checkCartStatus(
        product.id,
        selectedVariant?.product_variant_id ?? null,
        hasVariants
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ==========================================
            TOP SECTION
        ========================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT COLUMN */}

          <div className="relative flex items-center justify-center bg-gray-50 rounded-lg p-8">

            <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line
                  x1="21"
                  y1="3"
                  x2="14"
                  y2="10"
                ></line>
                <line
                  x1="3"
                  y1="21"
                  x2="10"
                  y2="14"
                ></line>
              </svg>
            </button>

            <img
              src={productImage}
              alt={product.name}
              className="w-full max-w-md object-contain mix-blend-multiply"
            />
          </div>

          {/* RIGHT COLUMN */}

          <div className="flex flex-col justify-center">

            {/* BREADCRUMB */}

            <nav className="flex items-center text-xs font-semibold tracking-wider text-gray-500 uppercase mb-6">
              <span className="text-amber-500">
                Shop
              </span>

              <span className="mx-2 text-gray-400">
                ›
              </span>

              <span className="text-gray-900">
                {product.category}
              </span>

              <span className="mx-2 text-gray-400">
                ›
              </span>

              <span className="text-gray-900">
                {product.name}
              </span>
            </nav>

            {/* PRODUCT TITLE */}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* ==========================================
                VARIANT SELECTOR
            ========================================== */}

            {hasVariants && (
              <div className="mb-6">

                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Select Variant
                </label>

                <select
                  value={
                    selectedVariant?.product_variant_id ||
                    ""
                  }
                  onChange={handleVariantChange}
                  className="w-full max-w-sm border border-gray-300 rounded px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {variants.map((variant) => (
                    <option
                      key={
                        variant.product_variant_id
                      }
                      value={
                        variant.product_variant_id
                      }
                    >
                      {variant.product_variant_name ||
                        variant.variant_name ||
                        "Variant"}

                      {(variant.product_variant_value ||
                        variant.variant_value)
                        ? ` - ${
                            variant.product_variant_value ||
                            variant.variant_value
                          }`
                        : ""}
                    </option>
                  ))}
                </select>

              </div>
            )}

            {/* PRICE */}

            <div className="text-2xl font-bold text-gray-600 mb-2">
              Rs {currentRate}
            </div>

            {/* STOCK */}

            <div className="text-sm mb-8">
              {currentStock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({currentStock})
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="text-gray-600 space-y-4 mb-10 leading-relaxed">
              <p>
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* ACTIONS */}

            <div className="flex gap-4 mb-6">

              {/* QUANTITY */}

              <div className="flex items-center border border-gray-300 rounded overflow-hidden w-24">

                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full text-center py-3 text-gray-800 focus:outline-none"
                />

                <div className="flex flex-col border-l border-gray-300">

                  <button
                    onClick={increaseQuantity}
                    disabled={
                      currentStock <= 0 ||
                      quantity >= currentStock
                    }
                    className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-b border-gray-300 text-gray-600 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ▲
                  </button>

                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ▼
                  </button>

                </div>
              </div>

              {/* ADD TO CART */}

              <button
                onClick={handleAddToCart}
                disabled={
                  currentStock <= 0 ||
                  addingToCart
                }
                className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {currentStock <= 0
                  ? "Out of stock"
                  : addingToCart
                  ? "Adding..."
                  : isAddedToCart
                  ? "View Cart"
                  : "Add to cart"}
              </button>

            </div>

            {/* SECONDARY ACTIONS */}

            <div className="flex items-center gap-6 text-sm font-medium text-gray-500 mb-10 pb-8 border-b border-gray-100">
              <button className="hover:text-gray-900 transition">
                Wishlist
              </button>

              <button className="hover:text-gray-900 transition">
                Compare
              </button>

              <button className="hover:text-gray-900 transition">
                Size Guide
              </button>
            </div>

            {/* CATEGORY & SHARE */}

            <div className="text-sm">

              <div className="text-gray-500 mb-4">
                <span className="font-bold text-gray-900 tracking-wider">
                  CATEGORY:
                </span>{" "}
                {product.category ||
                  "Uncategorized"}
              </div>

              <div className="font-bold text-gray-900 mb-3">
                Share your love
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Instagram</span>
              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            BOTTOM SECTION
        ========================================== */}

        <div className="mt-20">

          {/* TABS */}

          <div className="flex justify-center border-b border-gray-200">
            <nav className="flex space-x-12 -mb-px">

              {/* DESCRIPTION TAB */}

              <button
                onClick={() =>
                  setActiveTab("description")
                }
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "description"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>

              {/* ADDITIONAL INFORMATION TAB */}

              {hasVariants && (
                <button
                  onClick={() =>
                    setActiveTab("additional")
                  }
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm tracking-wider uppercase transition-colors duration-200 ${
                    activeTab === "additional"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Additional Information
                </button>
              )}

              {/* REVIEWS TAB */}

              <button
                onClick={() =>
                  setActiveTab("reviews")
                }
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "reviews"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews (0)
              </button>

            </nav>
          </div>

          {/* TAB CONTENT */}

          <div className="py-10 text-gray-600 leading-relaxed text-[15px]">

            {/* DESCRIPTION */}

            {activeTab === "description" && (
              <div className="space-y-6">
                <p>
                  {product.description ||
                    "No detailed description available."}
                </p>
              </div>
            )}

            {/* ADDITIONAL INFORMATION */}

            {activeTab === "additional" &&
              hasVariants && (
                <div className="space-y-8">

                  {/* BASIC PRODUCT INFORMATION */}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Product Information
                    </h3>

                    <div className="space-y-3">
                      <p>
                        <strong>
                          Product ID:
                        </strong>{" "}
                        {product.id}
                      </p>

                      <p>
                        <strong>
                          Product Name:
                        </strong>{" "}
                        {product.name}
                      </p>

                      <p>
                        <strong>
                          Category:
                        </strong>{" "}
                        {product.category ||
                          "Uncategorized"}
                      </p>
                    </div>
                  </div>

                  {/* ALL PRODUCT VARIANTS */}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Product Variants
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-200">

                        <thead>
                          <tr className="bg-gray-50">

                            <th className="border border-gray-200 px-4 py-3 text-left">
                              Variant ID
                            </th>

                            <th className="border border-gray-200 px-4 py-3 text-left">
                              Variant
                            </th>

                            <th className="border border-gray-200 px-4 py-3 text-left">
                              Value
                            </th>

                            <th className="border border-gray-200 px-4 py-3 text-left">
                              Price
                            </th>

                            <th className="border border-gray-200 px-4 py-3 text-left">
                              Stock Level
                            </th>

                          </tr>
                        </thead>

                        <tbody>
                          {variants.map(
                            (variant) => (
                              <tr
                                key={
                                  variant.product_variant_id
                                }
                                className="hover:bg-gray-50"
                              >

                                <td className="border border-gray-200 px-4 py-3">
                                  {
                                    variant.product_variant_id
                                  }
                                </td>

                                <td className="border border-gray-200 px-4 py-3 font-medium">
                                  {variant.product_variant_name ||
                                    variant.variant_name ||
                                    "-"}
                                </td>

                                <td className="border border-gray-200 px-4 py-3">
                                  {variant.product_variant_value ||
                                    variant.variant_value ||
                                    "-"}
                                </td>

                                <td className="border border-gray-200 px-4 py-3">
                                  Rs{" "}
                                  {
                                    variant.product_rate
                                  }
                                </td>

                                <td className="border border-gray-200 px-4 py-3">
                                  {variant.product_stock_level ??
                                    variant.stock_level ??
                                    0}
                                </td>

                              </tr>
                            )
                          )}
                        </tbody>

                      </table>
                    </div>
                  </div>

                </div>
              )}

            {/* REVIEWS */}

            {activeTab === "reviews" && (
              <div className="text-center text-gray-500 italic py-8">
                There are no reviews yet.
              </div>
            )}

          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}

      <LoginForm
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        onRegister={() => {
          setIsLoginOpen(false);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
};

export default ProductDetails;
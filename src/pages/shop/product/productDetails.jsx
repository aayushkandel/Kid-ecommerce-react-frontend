
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getOneProduct, getImage } from "../../../api/apiRouter";

const ProductDetails = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  const getProductDetails = async () => {
    try {
      setLoading(true);

      // Get single product
      const productResponse = await getOneProduct(id);

      setProduct(productResponse.data);
      console.log(productResponse.data);

      // Get product images
      try {
        const imageResponse = await getImage(id);

        setImages(imageResponse.data.images || []);
      } catch (error) {
        console.log("No images found");
        setImages([]);
      }

    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const productImage =
    images.length > 0
      ? `http://127.0.0.1:8000/${images[0].image}`
      : "/placeholder.png";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT COLUMN: IMAGE */}
          <div className="relative flex items-center justify-center bg-gray-50 rounded-lg p-8">

            {/* Expand Icon */}
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
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>

            <img
              src={productImage}
              alt={product.name}
              className="w-full max-w-md object-contain mix-blend-multiply"
            />
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="flex flex-col justify-center">

            {/* Breadcrumb */}
            <nav className="flex items-center text-xs font-semibold tracking-wider text-gray-500 uppercase mb-6">

              <span className="text-amber-500">
                Shop
              </span>

              <span className="mx-2 text-gray-400">›</span>

              <span className="text-gray-900">
                {product.name}
              </span>

            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-600 mb-8">
              Rs {product.price}
            </div>

            {/* Short Description */}
            <div className="text-gray-600 space-y-4 mb-10 leading-relaxed">

              <p>
                {product.description || "No description available for this product."}
              </p>

            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">

              {/* Quantity Input */}
              <div className="flex items-center border border-gray-300 rounded overflow-hidden w-24">

                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-full text-center py-3 text-gray-800 focus:outline-none"
                />

                <div className="flex flex-col border-l border-gray-300">

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-b border-gray-300 text-gray-600 focus:outline-none"
                  >
                    ▲
                  </button>

                  <button
                    onClick={() =>
                      setQuantity((q) => (q > 1 ? q - 1 : 1))
                    }
                    className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none"
                  >
                    ▼
                  </button>

                </div>
              </div>

              {/* Add to Cart */}
              <button className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-8 rounded transition duration-200">
                Add to cart
              </button>

            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-6 text-sm font-medium text-gray-500 mb-10 pb-8 border-b border-gray-100">

              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                Wishlist
              </button>

              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                Compare
              </button>

              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                Size Guide
              </button>

            </div>

            {/* Category & Share */}
            <div className="text-sm">

              <div className="text-gray-500 mb-4">
                <span className="font-bold text-gray-900 tracking-wider">
                  CATEGORY:
                </span>{" "}
                {product.category || "Uncategorized"}
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

        {/* BOTTOM SECTION */}
        <div className="mt-20">

          {/* Tabs Navigation */}
          <div className="flex justify-center border-b border-gray-200">

            <nav className="flex space-x-12 -mb-px">

              <button
                onClick={() => setActiveTab("description")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "description"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("additional")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm tracking-wider uppercase transition-colors duration-200 ${
                  activeTab === "additional"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Additional Information
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
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

          {/* Tab Content */}
          <div className="py-10 text-gray-600 leading-relaxed text-[15px]">

            {activeTab === "description" && (
              <div className="space-y-6">
                <p>
                  {product.description ||
                    "No detailed description available."}
                </p>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="space-y-4">

                <p>
                  <strong>Product ID:</strong> {product.id}
                </p>

                <p>
                  <strong>Stock Level:</strong> {product.stock_level}
                </p>

                <p>
                  <strong>Price:</strong> Rs {product.price}
                </p>

              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center text-gray-500 italic py-8">
                There are no reviews yet.
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;


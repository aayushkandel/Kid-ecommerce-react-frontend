import React, { useState, useEffect, useRef } from "react";

import {
  getImage,
  getProduct,
  getProductRate,
} from "../../../api/apiRouter";

import ProductCard from "../../../components/home/product_card";

const Product = ({
  priceRange,
  selectedCategories,
  selectedVariants,
}) => {
  const [products, setProducts] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const [sortOption, setSortOption] = useState("default");

  // Ref for Product component
  const productRef = useRef(null);

  const productsPerPage = 9;

  // Get products
  const getProductData = async () => {
    try {
      const response = await getProduct();

      const productsWithImages = await Promise.all(
        response.data.map(async (product) => {
          try {
            // Get product image
            const imageResponse = await getImage(product.id);

            const firstImage = imageResponse.data.images[0];

            // Get product variants
            let productVariants = [];

            try {
              const rateResponse = await getProductRate(product.id);

              productVariants =
                rateResponse.data?.product_variants || [];
            } catch (error) {
              productVariants = [];
            }

            return {
              ...product,
              image: firstImage ? firstImage.image : null,
              productVariants,
            };
          } catch (error) {
            return {
              ...product,
              image: null,
              productVariants: [],
            };
          }
        })
      );

      setProducts(productsWithImages);

      console.log("Products:", productsWithImages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const productPrice = Number(product.price);

    // Price filter
    const priceMatches =
      productPrice >= priceRange.min &&
      productPrice <= priceRange.max;

    // Category filter
    const categoryMatches =
      selectedCategories.length === 0 ||
      selectedCategories.includes(Number(product.category_id));

    return priceMatches && categoryMatches;
  });

  /*
    ==========================================
    SORT PRODUCTS
    ==========================================
  */

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return Number(a.price) - Number(b.price);
    }

    if (sortOption === "highToLow") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

  /*
    ==========================================
    PAGINATION
    ==========================================
  */

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    endIndex
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedCategories, selectedVariants, sortOption]);

  /*
    ==========================================
    SCROLL TO TOP OF PRODUCT COMPONENT
    ==========================================
  */

  useEffect(() => {
    if (currentPage === 1) return;

    if (productRef.current) {
      const productTop =
        productRef.current.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: productTop,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  /*
    ==========================================
    PAGINATION FUNCTIONS
    ==========================================
  */

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div ref={productRef}>

        {/* ==============================
            TOP BAR
        ============================== */}

        <div className="flex items-center justify-between mb-6">

          <p className="text-sm font-semibold tracking-wide text-slate-500">
            SHOWING{" "}
            {sortedProducts.length === 0 ? 0 : startIndex + 1}{" "}
            -{" "}
            {Math.min(endIndex, sortedProducts.length)}{" "}
            OF {sortedProducts.length} RESULTS
          </p>

          {/* SORTING FILTER */}

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="default">
              Default sorting
            </option>

            <option value="lowToHigh">
              Price: Low to High
            </option>

            <option value="highToLow">
              Price: High to Low
            </option>
          </select>

        </div>


        {/* ==============================
            PRODUCT GRID
        ============================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {currentProducts.length > 0 ? (

            currentProducts.map(
              ({
                id,
                name,
                category,
                price,
                image,
                description,
              }) => (

                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  category={category}
                  price={price}
                  image={image}
                  description={description}
                />

              )
            )

          ) : (

            <div className="col-span-full text-center py-16">

              <p className="text-lg font-semibold text-slate-700">
                No products found
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Try selecting a different price range or category.
              </p>

            </div>

          )}

        </div>


        {/* ==============================
            PAGINATION
        ============================== */}

        {sortedProducts.length > 0 && totalPages > 1 && (

          <div className="flex items-center justify-between mt-10">

            {/* PREVIOUS */}

            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`inline-flex items-center gap-2 border border-gray-200 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-slate-900 hover:border-gray-400"
              }`}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />

              </svg>

              PREVIOUS

            </button>


            {/* PAGE NUMBERS */}

            <div className="flex items-center gap-2">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`h-10 w-10 rounded-lg font-bold text-sm transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-amber-400 text-slate-900"
                      : "text-slate-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>

              ))}

            </div>


            {/* NEXT */}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center gap-2 border border-gray-200 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-slate-900 hover:border-gray-400"
              }`}
            >

              NEXT

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />

              </svg>

            </button>

          </div>

        )}

      </div>
    </>
  );
};

export default Product;
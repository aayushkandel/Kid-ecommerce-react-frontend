
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getProduct, getImage } from "../../api/apiRouter";
import ProductCard from "../home/product_card";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();

        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            try {
              const imageResponse = await getImage(product.id);

              const firstImage = imageResponse.data.images[0];

              return {
                ...product,
                image: firstImage ? firstImage.image : null,
              };
            } catch (error) {
              return {
                ...product,
                image: null,
              };
            }
          })
        );

        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products whenever query or category changes
  useEffect(() => {
    let filtered = products;

    // Filter by product name character-wise
    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [query, category, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Search Results
          </h1>

          <p className="text-gray-500 mt-2">
            {query
              ? `Showing results for "${query}"`
              : category
              ? `Showing products in "${category}"`
              : "All Products"}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="border border-gray-200 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-500">Loading products...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with a different product name.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(
            ({ id, name, category, price, image }) => (
              <ProductCard
                key={id}
                id={id}
                name={name}
                category={category}
                price={price}
                image={image}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;


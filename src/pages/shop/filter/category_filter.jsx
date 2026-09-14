import React, { useEffect, useState } from "react";
import { getcategory, getProduct } from "../../../api/apiRouter";

const Category_filter = ({
  selectedCategories,
  setSelectedCategories,
}) => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Get categories
  const getCategoryData = async () => {
    try {
      const response = await getcategory();

      console.log("Categories:", response.data);

      setCategories(response.data.data);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Get products
  const getProductData = async () => {
    try {
      const response = await getProduct();

      console.log("Products:", response.data);

      setProducts(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
    getProductData();
  }, []);

  // Handle category checkbox
  const handleCategoryChange = (categoryId) => {

    if (selectedCategories.includes(categoryId)) {

      setSelectedCategories(
        selectedCategories.filter(
          (id) => id !== categoryId
        )
      );

    } else {

      setSelectedCategories([
        ...selectedCategories,
        categoryId,
      ]);

    }
  };

  // Count products for a category
  const getProductCount = (categoryId) => {

    return products.filter(
      (product) =>
        Number(product.category_id) === Number(categoryId)
    ).length;

  };

  return (
    <>
      <div>

        <h3 className="font-bold text-slate-900 mb-5">
          Filter by category
        </h3>

        <ul className="space-y-3">

          {categories.map((category) => (

            <li
              key={category.id}
              className="flex items-center justify-between"
            >

              <label className="flex items-center gap-3 text-slate-600 cursor-pointer">

                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() =>
                    handleCategoryChange(category.id)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-0"
                />

                {category.name}

              </label>

              <span className="text-sm text-slate-400">
                {getProductCount(category.id)}
              </span>

            </li>

          ))}

        </ul>

      </div>
    </>
  );
};

export default Category_filter;
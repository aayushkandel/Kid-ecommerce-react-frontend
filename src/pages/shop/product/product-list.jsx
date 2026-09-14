import React,{useState,useEffect} from "react";

import { getImage, getProduct } from "../../../api/apiRouter";
import ProductCard from "../../../components/home/product_card";
import { NavLink } from "react-router";

const Product = () => {
  

    const [products,setProducts]=useState([]);

  const getProductData = async () => {
  const response = await getProduct();

  const productsWithImages = await Promise.all(
    response.data.map(async (product) => {
      try {
        const imageResponse = await getImage(product.id);

        const firstImage = imageResponse.data.images[0];

        return {
          ...product,
          image: firstImage.image
        };
      } catch (error) {
        return {
          ...product,
          image: null
        };
      }
    })
  );

  setProducts(productsWithImages);
  console.log(productsWithImages);
};

 useEffect(()=>{
  getProductData();
 },[]);
  return (
    <>
      <div>
        {/* <!-- Top bar --> */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold tracking-wide text-slate-500">
            SHOWING 1-12 OF 35 RESULTS
          </p>
          <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none">
            <option>Default sorting</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* <!-- Product grid --> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <!-- Card: Augue Nullam --> */}
          {
          products.map(({id, name, category, price, image,description}) => (
            <ProductCard key={id} id={id} name={name} category={category} price={price} image={image} description={description} />
          ))
         }
        </div>

        {/* <!-- Pagination --> */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-2">
            <button className="h-10 w-10 rounded-lg bg-amber-400 text-slate-900 font-bold text-sm">
              1
            </button>
            <button className="h-10 w-10 rounded-lg text-slate-700 font-semibold text-sm hover:bg-gray-100">
              2
            </button>
            <button className="h-10 w-10 rounded-lg text-slate-700 font-semibold text-sm hover:bg-gray-100">
              3
            </button>
          </div>
          <button className="inline-flex items-center gap-2 border border-gray-200 text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-lg hover:border-gray-400 transition-colors duration-200">
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
      </div>
    </>
  );
};

export default Product;

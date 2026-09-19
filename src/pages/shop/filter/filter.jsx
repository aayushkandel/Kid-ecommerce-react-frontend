
import React from "react";
import Price_filter from "./Price_filter";
import Category_filter from "./category_filter";

const Filter = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  
}) => {

  return (
    <>
      <aside className="space-y-10">

        {/* Price filter */}
       <Price_filter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
         
        />

        {/* Category filter */}
        <Category_filter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {/* Best selling */}
        <div>

          <h3 className="font-bold text-slate-900 mb-5">
            Best selling
          </h3>

          <ul className="space-y-4">

            <li className="flex items-center gap-4">
              <img
                src="/assets/product-image-13.webp"
                alt="Torquent Oduis"
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Torquent Oduis
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  $25.00
                </p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <img
                src="/assets/product-image-14.webp"
                alt="Justo Finibus"
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Justo Finibus
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  $35.00
                </p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <img
                src="/assets/product-image-15.webp"
                alt="Mattis Aliquam"
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Mattis Aliquam
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  $30.00{" "}
                  <span className="line-through text-slate-400">
                    $35.00
                  </span>
                </p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <img
                src="/assets/product-image-16.webp"
                alt="Montes Dictum"
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Montes Dictum
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  $15.00{" "}
                  <span className="line-through text-slate-400">
                    $20.00
                  </span>
                </p>
              </div>
            </li>

          </ul>
        </div>

        {/* Promo card */}
        <div className="relative rounded-3xl overflow-hidden bg-amber-200 min-h-[340px]">

          <div className="relative z-10 p-6">

            <p className="text-xs font-bold tracking-wide text-slate-800">
              NEW COLLECTION
            </p>

            <div className="flex items-end gap-1 mt-2">

              <span className="text-6xl font-black text-slate-900 leading-none">
                40
              </span>

              <span className="flex flex-col leading-tight pb-1">
                <span className="text-slate-900 font-semibold text-sm">
                  %
                </span>

                <span className="text-slate-900 font-semibold text-sm">
                  OFF
                </span>
              </span>

            </div>

            <a
              href="#"
              className="inline-block mt-32 bg-slate-900 text-white font-semibold text-sm px-6 py-4 rounded-lg hover:bg-slate-700 transition-colors duration-200"
            >
              View Offer
            </a>

          </div>

          <img
            src="/assets/boy-child.webp"
            alt="New collection"
            className="absolute bottom-0 right-3 h-56 w-auto object-contain"
          />

        </div>

      </aside>
    </>
  );
};

export default Filter;


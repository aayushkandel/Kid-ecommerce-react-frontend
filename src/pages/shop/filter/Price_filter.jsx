import React from "react";
const Price_filter = ({ priceRange, setPriceRange }) => {
  const MIN_PRICE = 100;
  const MAX_PRICE = 100000;
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange.max) {
      setPriceRange({ ...priceRange, min: value });
    }
  };
  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange.min) {
      setPriceRange({ ...priceRange, max: value });
    }
  };
  return (
    <>
      {" "}
      <div>
        {" "}
        <h3 className="font-bold text-slate-900 mb-5">
          {" "}
          Filter by price{" "}
        </h3>{" "}
        {/* Price slider */}{" "}
        <div className="relative h-8">
          {" "}
          {/* Background line */}{" "}
          <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 rounded-full" />{" "}
          {/* Selected range */}{" "}
          <div
            className="absolute top-3 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${((priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
              right: `${100 - ((priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
            }}
          />{" "}
          {/* Minimum price */}{" "}
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step="100"
            value={priceRange.min}
            onChange={handleMinChange}
            className="absolute top-0 left-0 w-full h-7 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-400 [&::-webkit-slider-thumb]:cursor-pointer"
          />{" "}
          {/* Maximum price */}{" "}
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step="100"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="absolute top-0 left-0 w-full h-7 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-400 [&::-webkit-slider-thumb]:cursor-pointer"
          />{" "}
        </div>{" "}
        {/* Current selected price */}{" "}
        <p className="text-sm text-slate-500 mb-8">
          {" "}
          Price:{" "}
          <span className="font-semibold text-slate-900">
            {" "}
            Rs. {priceRange.min.toLocaleString()} - Rs.{" "}
            {priceRange.max.toLocaleString()}{" "}
          </span>{" "}
        </p>{" "}
        {/* Color filter */}{" "}
        
      </div>{" "}
    </>
  );
};
export default Price_filter;

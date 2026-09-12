import React from "react";

const Compare = () => {
  return (
    <>
      <button className="flex items-center justify-center h-9 w-9 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </button>
    </>
  );
};

export default Compare;

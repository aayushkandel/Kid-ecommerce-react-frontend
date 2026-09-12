import React from "react";

const Hero = () => {
  return (
    <>
      <section className="w-full mx-auto px-6 py-12">
        {/**<!--shop hero section--> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <!-- Card 1: Collections --> */}
          <div className="group relative rounded-3xl overflow-hidden h-130 w-3/3">
            <img
              src="src/assets/shop-hero-1.webp"
              alt="Collections"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10"></div>

            <div className="relative flex items-start justify-between p-6">
              <span className="bg-white text-slate-900 text-sm font-semibold px-5 py-3 rounded-full">
                Collections
              </span>
              <span className="flex items-center justify-center h-11 w-11 rounded-full bg-white hover:bg-black hover:text-white">
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
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-bold text-2xl leading-snug">
                Blandit Natoque Elementum Nascetur
              </h3>
            </div>
          </div>

          {/* <!-- Card 2: New Arrivals --> */}
          <div className="group relative rounded-3xl overflow-hidden h-130 w-80">
            <img
              src="src/assets/shop-hero-2.webp"
              alt="New Arrivals"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10"></div>

            <div className="relative flex items-start justify-between p-6">
              <span className="bg-white text-slate-900 text-sm font-semibold px-5 py-3 rounded-full">
                New Arrivals
              </span>
              <span className="flex items-center justify-center h-11 w-11 rounded-full bg-white hover:bg-black hover:text-white">
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
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-bold text-2xl leading-snug">
                Fermentum Maximus Consecte Bingilla
              </h3>
            </div>
          </div>

          {/* <!-- Card 3: Discounts + Subscribe --> */}
          <div className="group absolute rounded-3xl overflow-hidden h-130 w-138 ml-198">
            <img
              src="src/assets/shop-hero-3.webp"
              alt="Discounts"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            <div className="relative flex items-start justify-between p-6">
              <span className="bg-white text-slate-900 text-sm font-semibold px-5 py-3 rounded-full">
                Discounts
              </span>
              <span className="flex items-center justify-center h-11 w-11 rounded-full bg-white hover:bg-black hover:text-white">
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
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-stretch gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-white rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none min-w-0"
                />
                <button className="bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

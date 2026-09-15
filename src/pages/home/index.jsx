
import { NavLink } from "react-router";
import { getProduct,getImage } from "../../api/apiRouter";
import Compare from "../../components/cart_buttons/compare";
import View from "../../components/cart_buttons/view";
import WishList from "../../components/cart_buttons/wishList";
import ProductCard from "../../components/home/product_card";
import React,{useState,useEffect} from "react";


function Home() {
 
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
		

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* <!--Hero section--> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* <!-- Left: text content --> */}
          <div>
            <h1
              className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight"
            >
              Where Every Little One Finds Style
            </h1>

            <p className="mt-8 text-slate-500 text-lg max-w-md">
              Explore our exclusive collection of kids' clothes and toys to get
              ready for the autumn season.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <NavLink to="/shop"  state={{ scrollToProduct: true }}>
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-yellow-500 transition-colors duration-200">
                Explore Collection
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
                </svg></div>
              </NavLink>

             
            </div>
          </div>

          {/* <!-- Right: images + badge + subscribe --> */}
          <div className="relative">
            <div className="flex gap-6">
              {/* <!-- Left photo card --> */}
              <div
                className="flex-1 rounded-3xl overflow-hidden bg-amber-200 mt-10 mb-5 `aspect-3/4`"
              >
                <img
                  src="src/assets/boy-child.webp"
                  alt="Child in yellow"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* <!-- Right photo card --> */}
              <div
                className="flex-1 rounded-3xl overflow-hidden bg-violet-100 mb-20 `aspect-3/4`"
              >
                <img
                  src="src/assets/girl-child.webp"
                  alt="Child in striped shirt"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* <!-- 30% OFF sticker badge --> */}
            <div
              className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full drop-shadow-md"
                >
                  <path
                    fill="white"
                    stroke="#e5d9f2"
                    strokeWidth="2"
                    d="M100 0
                   L112 20 L135 8 L138 33 L163 30 L157 55 L182 61 L167 82 L188 96
                   L167 110 L182 131 L157 137 L163 162 L138 159 L135 184 L112 172
                   L100 192 L88 172 L65 184 L62 159 L37 162 L43 137 L18 131 L33 110
                   L12 96 L33 82 L18 61 L43 55 L37 30 L62 33 L65 8 L88 20 Z"
                  />
                </svg>
                <div className="relative text-center leading-tight">
                  <span className="block text-2xl font-black text-slate-900"
                    >30%</span
                  >
                  <span
                    className="block text-sm font-bold text-slate-900 tracking-wide"
                    >OFF</span
                  >
                </div>
              </div>
            </div>

            {/* <!-- Subscribe bar --> */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 border border-gray-200 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
              <button
                className="bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-5">
        {/* <!--Dragon section--> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Big left image card --> */}
          <div
            className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-105 group"
          >
            <img
              src="src/assets/dragon.webp"
              alt="New toys collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 `bg-gradient-to-t` from-black/50 via-black/10 to-transparent"
            ></div>

            <div className="relative h-full flex flex-col justify-end p-8">
              <p className="text-white font-semibold tracking-wide text-sm">
                NEW TOYS COLLECTION
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-6xl font-black text-white leading-none"
                  >20</span
                >
                <span className="flex flex-col leading-tight pb-1">
                  <span className="text-white font-semibold text-sm">%</span>
                  <span className="text-white font-semibold text-sm">OFF</span>
                </span>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-6 py-4 rounded-lg w-fit hover:bg-gray-100 transition-colors duration-200"
              >
                VIEW OFFER
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
              </a>
            </div>
          </div>

          {/* <!-- Right column: two stacked cards --> */}
          <div className="flex flex-col gap-6">
            {/* <!-- Shoes card --> */}
            <div
              className="relative flex-1 rounded-3xl bg-violet-100 overflow-hidden p-8 min-h-[196px] group"
            >
              <p className="text-slate-900 font-semibold tracking-wide text-sm">
                NEW SHOES COLLECTION
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-5xl font-black text-slate-900 leading-none"
                  >10</span
                >
                <span className="flex flex-col leading-tight pb-1">
                  <span className="text-slate-900 font-semibold text-sm">%</span>
                  <span className="text-slate-900 font-semibold text-sm">OFF</span>
                </span>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-3.5 rounded-lg w-fit hover:bg-gray-50 transition-colors duration-200"
              >
                VIEW OFFER
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
              </a>
              <img
                src="src/assets/baby-shoe.webp"
                alt="Shoes"
                className="absolute bottom-9 right-9 w-32 h-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* <!-- Hats card --> */}
            <div
              className="relative flex-1 rounded-3xl bg-amber-100 overflow-hidden p-8 min-h-49 group"
            >
              <p className="text-slate-900 font-semibold tracking-wide text-sm">
                NEW HATS COLLECTION
              </p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-5xl font-black text-slate-900 leading-none"
                  >12</span
                >
                <span className="flex flex-col leading-tight pb-1">
                  <span className="text-slate-900 font-semibold text-sm">%</span>
                  <span className="text-slate-900 font-semibold text-sm">OFF</span>
                </span>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-3.5 rounded-lg w-fit hover:bg-gray-50 transition-colors duration-200"
              >
                VIEW OFFER
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
              </a>
              <img
                src="src/assets/orange-hat.webp"
                alt="Hat"
                className="absolute bottom-9 right-9 w-24 h-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* <!-- Logo bar --> */}
        <div className="mt-6 bg-slate-800 rounded-3xl px-10 py-10">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="8" height="8" rx="2" />
                <rect x="13" y="13" width="8" height="8" rx="2" />
              </svg>
              <span className="font-bold text-lg">Logoipsum</span>
            </div>

            <div className="flex items-center gap-1 text-white">
              <span className="font-bold text-2xl tracking-tight">LO</span>
              <span className="h-6 w-6 rounded-full border-2 border-white"></span>
              <span className="font-bold text-2xl tracking-tight">O</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="6" />
              </svg>
              <span className="font-bold text-lg">Logoipsum</span>
            </div>

            <div className="flex items-center gap-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
              </svg>
              <span className="font-bold text-2xl tracking-tight">OGO</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* <!--Featured products--> */}
        {/* <!-- Header --> */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black text-slate-900">Featured Products</h2>
         <NavLink to="/shop"  state={{ scrollToProduct: true }}>
          <div
            
            className="inline-flex items-center gap-2 border border-gray-200 text-slate-900 font-semibold text-sm px-5 py-3.5 rounded-lg hover:border-gray-400 transition-colors duration-200"
          >
            View All Products
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
          </div></NavLink>
        </div>

        {/* <!-- Product grid --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          

        {
  products.slice(0, 8).map(({id, name, category, price, image}) => (
    <ProductCard 
      key={id} 
      id={id} 
      name={name} 
      category={category} 
      price={price} 
      image={image} 
    />
  ))
}
          
        </div>
      </section>

      <section className="mx-auto px-6 py-10 text-center w-full">
        {/* <!--Avatar stake--> */}

        <div className="flex justify-center -space-x-4 mb-6">
          <img
            src="src/assets/child-1.webp"
            alt="Customer"
            className="h-16 w-16 rounded-full border-4 border-white object-cover"
          />
          <img
            src="src/assets/child-2.webp"
            alt="Customer"
            className="h-16 w-16 rounded-full border-4 border-white object-cover"
          />
          <img
            src="src/assets/child-3.webp"
            alt="Customer"
            className="h-16 w-16 rounded-full border-4 border-white object-cover"
          />
          <img
            src="src/assets/child-4.webp"
            alt="Customer"
            className="h-16 w-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* <!-- Heading --> */}
        <h2 className="text-5xl font-black text-slate-900 mb-10">
          Trusted by over 10K+ customers
        </h2>

        {/* <!-- Category pills --> */}
        <div className="flex flex-wrap justify-center gap-5 w-full">
          {/* <!-- Hats & Scarfs --> */}
          <a
            href="#"
            className="group flex items-center gap-4 bg-amber-100 hover:bg-amber-200 rounded-full pl-6 pr-2 py-5 w-full sm:w-auto sm:min-w-[380px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-900 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 15c0-4.4 3.6-8 8-8s8 3.6 8 8"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15h18v1.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5V15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7V5m-3 3l-1-2m7 2l1-2"
              />
            </svg>
            <span
              className="flex-1 text-left font-bold text-slate-900 leading-tight"
              >HATS &amp;<br />SCARFS</span
            >
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
            >
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* <!-- Toys & Games --> */}
          <a
            href="#"
            className="group flex items-center gap-4 bg-rose-100 hover:bg-rose-200 rounded-full pl-6 pr-2 py-5 w-full sm:w-auto sm:min-w-[380px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-900 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 19c0-2 1.5-3 3-3h1l2-4 3 1 2-2 3 2-1 3c1 .5 2 1.5 2 3"
              />
              <circle cx="7" cy="19" r="1.2" />
              <circle cx="16" cy="19" r="1.2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l-2 2"
              />
            </svg>
            <span
              className="flex-1 text-left font-bold text-slate-900 leading-tight"
              >TOYS &amp;<br />GAMES</span
            >
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
            >
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* <!-- Dresses & Suits --> */}
          <a
            href="#"
            className="group flex items-center gap-4 bg-emerald-100 hover:bg-emerald-200 rounded-full pl-6 pr-2 py-5 w-full sm:w-auto sm:min-w-[380px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-900 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3l3 2 3-2 2 4-2 1v11a1 1 0 01-1 1H10a1 1 0 01-1-1V8L7 7l2-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12.5c-1-1-2.5-.3-2.5 1 0 1.3 2.5 2.5 2.5 2.5s2.5-1.2 2.5-2.5c0-1.3-1.5-2-2.5-1z"
              />
            </svg>
            <span
              className="flex-1 text-left font-bold text-slate-900 leading-tight"
              >DRESSES &amp;<br />SUITS</span
            >
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
            >
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* <!-- Blouses & T-Shirts --> */}
          <a
            href="#"
            className="group flex items-center gap-4 bg-teal-100 hover:bg-teal-200 rounded-full pl-6 pr-2 py-5 w-full sm:w-auto sm:min-w-[380px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-900 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 4L4 7l2 3 2-1v9a1 1 0 001 1h6a1 1 0 001-1V9l2 1 2-3-4-3-2 2h-2L8 4z"
              />
            </svg>
            <span
              className="flex-1 text-left font-bold text-slate-900 leading-tight"
              >BLOUSES &amp;<br />T-SHIRTS</span
            >
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
            >
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          {/* <!-- Shoes & Socks --> */}
          <a
            href="#"
            className="group flex items-center gap-4 bg-violet-100 hover:bg-violet-200 rounded-full pl-6 pr-2 py-5 w-full sm:w-auto sm:min-w-[380px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-900 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3v5l-3 3v3a2 2 0 002 2h3a2 2 0 002-2V3H8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3v5l-3 3v3a2 2 0 002 2h3a2 2 0 002-2V3h-4z"
              />
            </svg>
            <span
              className="flex-1 text-left font-bold text-slate-900 leading-tight"
              >SHOES &amp;<br />SOCKS</span
            >
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200"
            >
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </section>

      <section className="w-full mx-auto px-6 pt-10">
        {/* <!-- Voucher card --> */}

        <div
          className="bg-amber-200/60 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center"
        >
          {/* <!-- Image --> */}
          <div className="h-120 lg:h-[90]">
            <img
              src="src/assets/subscribe-image.webp"
              alt="Child in yellow sweater"
              className="w-2/3 ml-20 h-full object-cover object-top"
            />
          </div>

          {/* <!-- Text + form --> */}
          <div className="px-8 py-10 lg:px-12">
            <h2 className="text-4xl font-black text-slate-900">Get Voucher</h2>
            <p className="mt-4 text-slate-700 max-w-md">
              Subscribe Today and Unlock Up to
              <span className="font-bold">20% OFF</span> Your Next Purchase!
            </p>

            <div className="mt-8 flex items-stretch gap-3 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none min-w-0"
              />
              <button
                className="bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

		</>
	)
}

export default Home;
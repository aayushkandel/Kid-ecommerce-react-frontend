function Footer () {
	return (
		<>

    <div className="bg-slate-900 rounded-3xl mt-16 mb-16 px-10 py-10"> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Secure Payments --> */}
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path strokeLinecap="round" d="M2 9h20" />
                <path strokeLinecap="round" d="M5 15h4" />
              </svg>
              <div>
                <h3 className="font-bold text-white">Secure Payments</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Tellus gravida ipsum aut facilisis tempus at et aliquam
                  estsem.
                </p>
              </div>
            </div>

            {/* <!-- Free Shipping --> */}
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2 8h11v8H2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 11h4l3 3v2h-7z"
                />
                <circle cx="6" cy="18" r="1.5" />
                <circle cx="17" cy="18" r="1.5" />
              </svg>
              <div>
                <h3 className="font-bold text-white">Free Shipping</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Non pulvinar aenean ultrices lectus vitae imperdiet aeu.
                </p>
              </div>
            </div>

            {/* <!-- 24/7 Support --> */}
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                />
                <path
                  strokeLinecap="round"
                  d="M10 10a2 2 0 113 1.7c-.6.4-1 1-1 1.8"
                />
                <circle cx="12" cy="16" r="0.5" fill="currentColor" />
              </svg>
              <div>
                <h3 className="font-bold text-white">24/7 Support</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Nullam iaculis vestibulum arcu id urnain pellentesque quis.
                </p>
              </div>
            </div>

            {/* <!-- Gifts & Sales --> */}
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="9" width="18" height="4" rx="1" />
                <path
                  strokeLinecap="round"
                  d="M5 13v7a1 1 0 001 1h12a1 1 0 001-1v-7"
                />
                <path strokeLinecap="round" d="M12 9v12" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9c-1.5 0-3-1-3-2.5S10 4 11 4.5 12 7 12 9zM12 9c1.5 0 3-1 3-2.5S14 4 13 4.5 12 7 12 9z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-white">Gifts &amp; Sales</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Aliquet ullamcorper leo mi vel sit pretium euismod eget
                  libero.
                </p>
              </div>
            </div>
          </div>
        </div>
		
		<footer className="max-w-7xl mx-auto px-6 py-14">

 
    {/* <!-- Top row: logo/blurb + phone --> */}
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
      <div className="max-w-md">
        <div className="flex items-center gap-2">
          <img src="src/assets/logo.svg" alt="" className="h-25 w-25" />
          
        </div>
        <p className="mt-4 text-slate-500">
          Discover our unique assortment of children's apparel and playthings in preparation for the upcoming fall season.
        </p>
      </div>
 
      <div className="flex items-center gap-3 border border-gray-200 rounded-full pl-2 pr-5 py-1.5 shrink-0 h-fit">
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z"/>
          </svg>
        </span>
        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">+977 - 9844208213</span>
      </div>
    </div>
 
    <hr className="border-gray-200 my-10" />
 
    {/* <!-- Link columns --> */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
 
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
        <ul className="space-y-3 text-slate-500">
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Dresses & Suits</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Shoes & Socks</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Blouses & T-Shirts</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Toys & Games</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Caps & Accessories</a></li>
        </ul>
      </div>
 
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
        <ul className="space-y-3 text-slate-500">
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">About Us</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">FAQ</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Our News</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Our Story</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Contact Us</a></li>
        </ul>
      </div>
 
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Useful</h4>
        <ul className="space-y-3 text-slate-500">
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Site Map</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Affiliate Area</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Delivery</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Locations</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Collaboration</a></li>
        </ul>
      </div>
 
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
        <ul className="space-y-3 text-slate-500">
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Shipping Policy</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Returns &amp; Exchanges</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Terms of Use</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-slate-900 transition-colors duration-200">Cookies Policy</a></li>
        </ul>
      </div>
 
    </div>
 
    <hr className="border-gray-200 my-10" />
 
    {/* <!-- Bottom row: copyright + social --> */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="text-slate-500 text-sm">Copyright © 2026 - WordPress Theme by CreativeThemes</p>
 
      <div className="flex items-center gap-3">
        <a href="#" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/>
          </svg>
        </a>
        <a href="#" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.9 3H21.6l-5.8 6.6L22.7 21h-5.3l-4.2-5.5L8.4 21H5.7l6.2-7.1L4.3 3h5.4l3.8 5 5.4-5zM17.9 19.4h1.5L8.2 4.5H6.6l11.3 14.9z"/>
          </svg>
        </a>
        <a href="#" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="#" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
            <path strokeLinecap="round" d="M9 9.5a3 3 0 016 0c0 2-3 2.5-3 4.5m0 3h.01" />
          </svg>
        </a>
        <a href="#" className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6.5c-2-3-6-4-8-2.5-1.5 3 0 8 8 12 8-4 9.5-9 8-12-2-1.5-6-.5-8 2.5z"/>
          </svg>
        </a>
      </div>
    </div>
 
  </footer>
		</>
	)
}

export default Footer;
function Contact() {
  return (
    <>
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* <!-- LEFT: image + contact info --> */}
          <div>
            <div class="rounded-3xl overflow-hidden bg-amber-200 h-[520px]">
              <img
                src="/assets/contact-us-image.webp"
                alt="Child pointing"
                class="  w-full h-full object-cover object-top"
              />
            </div>

            {/* <!-- Address --> */}
            <div class="flex items-start justify-between gap-6 mt-8">
              <div class="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-slate-900 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.6 7-11.5A7 7 0 105 9.5C5 14.4 12 21 12 21z"
                  />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <div>
                  <h3 class="font-bold text-slate-900">Address</h3>
                  <p class="text-slate-500 mt-2 leading-relaxed">
                    Ratnanagar-6, Sauraha
                    <br />
                    Nepal
                  </p>
                </div>
              </div>

              <a
                href="#"
                class="inline-flex items-center gap-2 border border-gray-200 text-slate-900 font-semibold text-sm px-5 py-3.5 rounded-lg hover:border-gray-400 transition-colors duration-200 shrink-0 h-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.5-5.5a2 2 0 010-2.8L9 6M4 12h16"
                  />
                </svg>
                Get Directions
              </a>
            </div>

            <hr class="border-gray-200 mt-8" />

            {/* <!-- Phone + Hours --> */}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
              <div class="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-slate-900 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.57 1 1 0 01-.25 1z"
                  />
                </svg>
                <div>
                  <h3 class="font-bold text-slate-900">Call Us Today</h3>
                  <p class="text-slate-500 mt-2">
                    <span class="font-semibold text-slate-700">Mobile:</span>{" "}
                    +977 9844208213{" "}
                  </p>
                  <p class="text-slate-500 mt-1">
                    <span class="font-semibold text-slate-700">Email:</span>{" "}
                    aayushkandel121@gmail.com
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-slate-900 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7v5l3.5 2"
                  />
                </svg>
                <div>
                  <h3 class="font-bold text-slate-900">Opening Hours</h3>
                  <p class="text-slate-500 mt-2">
                    <span class="font-semibold text-slate-700">Mon-Fri:</span>{" "}
                    08:30 – 20:00
                  </p>
                  <p class="text-slate-500 mt-1">
                    <span class="font-semibold text-slate-700">Sat-Sun:</span>{" "}
                    10:00 – 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- RIGHT: form --> */}
          <div>
            <h1 class="text-5xl font-black text-slate-900 leading-tight">
              Have Questions?
              <br />
              We're Here for You!
            </h1>
            <p class="mt-6 text-slate-500">
              Senectus velit sagittis inceptos fringilla mus mauris convallis
              lobortis.
            </p>

            <form class="mt-10 space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-slate-700 mb-2">
                    First Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    class="w-full bg-gray-100 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
                <div>
                  <label class="block text-slate-700 mb-2">
                    Last Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    class="w-full bg-gray-100 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </div>

              <div>
                <label class="block text-slate-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  class="w-full bg-gray-100 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div>
                <label class="block text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  class="w-full bg-gray-100 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div>
                <label class="block text-slate-700 mb-2">
                  Your Message <span class="text-red-500">*</span>
                </label>
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  class="w-full bg-gray-100 rounded-lg px-5 py-4 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                class="bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div class="bg-slate-900 rounded-3xl mt-16 mb-16 px-10 py-10">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Secure Payments --> */}
            <div class="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white shrink-0"
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
                <h3 class="font-bold text-white">Secure Payments</h3>
                <p class="text-sm text-slate-400 mt-1">
                  Tellus gravida ipsum aut facilisis tempus at et aliquam
                  estsem.
                </p>
              </div>
            </div>

            {/* <!-- Free Shipping --> */}
            <div class="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white shrink-0"
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
                <h3 class="font-bold text-white">Free Shipping</h3>
                <p class="text-sm text-slate-400 mt-1">
                  Non pulvinar aenean ultrices lectus vitae imperdiet aeu.
                </p>
              </div>
            </div>

            {/* <!-- 24/7 Support --> */}
            <div class="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white shrink-0"
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
                <h3 class="font-bold text-white">24/7 Support</h3>
                <p class="text-sm text-slate-400 mt-1">
                  Nullam iaculis vestibulum arcu id urnain pellentesque quis.
                </p>
              </div>
            </div>

            {/* <!-- Gifts & Sales --> */}
            <div class="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white shrink-0"
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
                <h3 class="font-bold text-white">Gifts &amp; Sales</h3>
                <p class="text-sm text-slate-400 mt-1">
                  Aliquet ullamcorper leo mi vel sit pretium euismod eget
                  libero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

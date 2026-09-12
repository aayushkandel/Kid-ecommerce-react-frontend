import NewsPost from "../../components/news/news_post";
import NewsAside from "../../components/news/news_aside";

function News() {
  return (
    <>
      <div class="w-[90%]">
        {/* <!--Main Container--> */}

        <section class="max-w-7xl mx-auto px-6 py-12">
          <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* <!-- LEFT: posts list --> */}
            <NewsPost />

            {/* <!-- RIGHT: sidebar --> */}
            <NewsAside />
          </div>
        </section>

        {/* remaining section footer */}
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
      </div>
    </>
  );
}

export default News;

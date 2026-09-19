function About() {
  return (
    <>
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div class="max-w-3xl">
            <p class="text-slate-500 mb-4">
              Our Mission to Make Kids Feel Comfortable and Confident
            </p>
            <h1 class="text-5xl font-black text-slate-900 leading-tight">
              We believe every outfit should be as joyful, playful, and unique
              as the kids who wear it.
            </h1>
          </div>
          <a
            href="#"
            class="inline-flex items-center gap-2 border border-gray-200 text-slate-900 font-semibold text-sm px-5 py-3.5 rounded-lg hover:border-gray-400 transition-colors duration-200 shrink-0 w-fit"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
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

        {/* <!-- 3-image collage --> */}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <img
            src="/assets/about-us-image-1.webp"
            alt="Kids sweater display"
            class="w-full h-96 sm:mt-24 rounded-2xl object-cover"
          />
          <img
            src="/assets/about-us-image-2.webp"
            alt="Nursery decor"
            class="w-full h-96 rounded-2xl object-cover"
          />
          <img
            src="/assets/about-us-image-3.webp"
            alt="Knit romper on hanger"
            class="w-full h-96 sm:mt-24 rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* <!-- ============ FEATURES SECTION ============ --> */}
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-9 w-9 text-slate-900 mb-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4-2.5-8-6-8-10.5A4.5 4.5 0 018.5 6c1.5 0 2.7.7 3.5 1.8C12.8 6.7 14 6 15.5 6A4.5 4.5 0 0120 10.5C20 15 16 18.5 12 21z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 17c0 2 1.5 3 3 3M20 17c0 2-1.5 3-3 3"
              />
            </svg>
            <h3 class="font-bold text-slate-900 text-xl mb-3">
              Driven by Love
            </h3>
            <p class="text-slate-500 leading-relaxed">
              Founded by a team of parents, designers, and dreamers, we set out
              to create a place where parents can find high-quality clothing.
            </p>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-9 w-9 text-slate-900 mb-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l1.6 4.9H19l-4.2 3 1.6 4.9-4.2-3-4.2 3 1.6-4.9-4.2-3h5.4L12 2z"
              />
            </svg>
            <h3 class="font-bold text-slate-900 text-xl mb-3">
              Designed for Fun and Magic
            </h3>
            <p class="text-slate-500 leading-relaxed">
              From cozy basics to whimsical prints and adventure-ready outfits,
              we carefully design each piece to reflect the fun and magic of
              being a kid.
            </p>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-9 w-9 text-slate-900 mb-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 13c1-3 4-5 8-5-1 4-3 7-8 7-2 0-3-1-3-1z"
              />
            </svg>
            <h3 class="font-bold text-slate-900 text-xl mb-3">
              Sustainable & Friendly
            </h3>
            <p class="text-slate-500 leading-relaxed">
              We source only the softest, most durable fabrics and ensure every
              piece is crafted with attention to detail, so it can stand up to
              even the busiest little explorers.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- ============ STORY / STATS SECTION ============ --> */}
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div class="rounded-3xl overflow-hidden bg-amber-200 h-[520px]">
            <img
              src="/assets/about-us-image-4.webp"
              alt="Child holding shopping bag"
              class="w-full h-full object-cover object-top"
            />
          </div>

          <div>
            <h2 class="text-5xl font-black text-slate-900 leading-tight">
              Your Children Deserve The Best
            </h2>
            <p class="mt-6 text-slate-500 max-w-lg leading-relaxed">
              Our story started with a simple dream: to create a space where
              parents could find clothes that kids love to wear and are built to
              withstand all their adventures.
            </p>

            <div class="grid grid-cols-3 gap-8 mt-10 max-w-md">
              <div>
                <p class="text-5xl font-black text-slate-900">12+</p>
                <hr class="border-gray-200 my-3" />
                <p class="font-semibold text-slate-900">Years</p>
              </div>
              <div>
                <p class="text-5xl font-black text-slate-900">60+</p>
                <hr class="border-gray-200 my-3" />
                <p class="font-semibold text-slate-900">Stores</p>
              </div>
              <div>
                <p class="text-5xl font-black text-slate-900">10+</p>
                <hr class="border-gray-200 my-3" />
                <p class="font-semibold text-slate-900">Countries</p>
              </div>
            </div>

            <a
              href="#"
              class="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-slate-700 transition-colors duration-200 mt-10"
            >
              Explore Our Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
      </section>

      {/* <!-- ============ TESTIMONIAL SECTION ============ --> */}
      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="relative border border-gray-200 rounded-3xl px-16 py-14 text-center">
          <button class="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full text-slate-400 hover:text-slate-900 hover:bg-gray-100 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <img
            src="/assets/child-1.webp"
            alt="Samantha Jackson's child"
            class="h-16 w-16 rounded-full object-cover mx-auto mb-6"
          />

          <p class="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            "My little ones are so picky, but they love the fun designs and
            bright colors. And as a mom, I love that the clothes are both
            stylish and sturdy!"
          </p>

          <p class="font-bold text-slate-900 mt-6">Samatha Jackson</p>
          <p class="text-slate-500 text-sm mt-1">Client</p>

          <div class="flex items-center justify-center gap-2 mt-6">
            <span class="h-2 w-6 rounded-full bg-amber-400"></span>
            <span class="h-2 w-2 rounded-full bg-gray-300"></span>
            <span class="h-2 w-2 rounded-full bg-gray-300"></span>
            <span class="h-2 w-2 rounded-full bg-gray-300"></span>
          </div>

          <button class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full text-slate-400 hover:text-slate-900 hover:bg-gray-100 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* <!-- ============ FAQ SECTION ============ --> */}
      <section class="max-w-5xl mx-auto px-6 py-16">
        <h2 class="text-4xl font-black text-slate-900 mb-10">
          Frequently Asked Questions
        </h2>

        <div class="space-y-4">
          <details class="group bg-gray-50 rounded-2xl px-8 py-6" open>
            <summary class="flex items-center justify-between font-bold text-slate-900 cursor-pointer list-none">
              Rutrum massa id nisi enim enim tincidunt ultricies
              <span class="shrink-0 ml-4 text-xl leading-none group-open:hidden">
                +
              </span>
              <span class="shrink-0 ml-4 text-xl leading-none hidden group-open:inline">
                &minus;
              </span>
            </summary>
            <div class="text-slate-500 leading-relaxed mt-5 space-y-4">
              <p>
                Metus volutpat blandit euismod molestie et viverra nulla. A
                aenean velit tellus bibendum. Lorem posuere eu sit lacus laoreet
                neque integer augue. Feugiat fringilla rhoncus eleifend
                vulputate suspendisse non hendrerit. Ipsum ultrices quisque
                blandit venenatis at libero.
              </p>
              <p>
                Et amet dictum aenean condimentum nulla praesent non, nullam
                litora torquent. Consequat ullamcorper semper senectus ut ornare
                vel dis. Accumsan maecenas facilisi ad; convallis habitasse
                quis.
              </p>
            </div>
          </details>

          <details class="group bg-gray-50 rounded-2xl px-8 py-6">
            <summary class="flex items-center justify-between font-bold text-slate-900 cursor-pointer list-none">
              Consequat sem leo viverra nunc turpis duis diam
              <span class="shrink-0 ml-4 text-xl leading-none group-open:hidden">
                +
              </span>
              <span class="shrink-0 ml-4 text-xl leading-none hidden group-open:inline">
                &minus;
              </span>
            </summary>
            <div class="text-slate-500 leading-relaxed mt-5">
              <p>
                Metus volutpat blandit euismod molestie et viverra nulla. A
                aenean velit tellus bibendum. Lorem posuere eu sit lacus laoreet
                neque integer augue.
              </p>
            </div>
          </details>

          <details class="group bg-gray-50 rounded-2xl px-8 py-6">
            <summary class="flex items-center justify-between font-bold text-slate-900 cursor-pointer list-none">
              Metus volutpat blandit euismod molestie et viverra
              <span class="shrink-0 ml-4 text-xl leading-none group-open:hidden">
                +
              </span>
              <span class="shrink-0 ml-4 text-xl leading-none hidden group-open:inline">
                &minus;
              </span>
            </summary>
            <div class="text-slate-500 leading-relaxed mt-5">
              <p>
                Metus volutpat blandit euismod molestie et viverra nulla. A
                aenean velit tellus bibendum. Lorem posuere eu sit lacus laoreet
                neque integer augue.
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

export default About;

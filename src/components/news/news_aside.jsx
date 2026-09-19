function NewsAside(){
    return(
        <>


    {/* <!-- RIGHT: sidebar --> */}

        <aside class="space-y-10">
 
      {/* <!-- Promo card --> */}
      <div class="relative rounded-3xl overflow-hidden bg-amber-200 min-h-[420px]">
        <div class="relative z-10 p-6">
          <p class="text-xs font-bold tracking-wide text-slate-800">NEW COLLECTION</p>
          <div class="flex items-end gap-1 mt-2">
            <span class="text-6xl font-black text-slate-900 leading-none">40</span>
            <span class="flex flex-col leading-tight pb-1">
              <span class="text-slate-900 font-semibold text-sm">%</span>
              <span class="text-slate-900 font-semibold text-sm">OFF</span>
            </span>
          </div>
          <a href="#" class="inline-block mt-56 bg-slate-900 text-white font-semibold text-sm px-6 py-4 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            View Offer
          </a>
        </div>
        <img src="/assets/girl-child.webp" alt="New collection" class="absolute bottom-0 right-1 h-72 w-auto object-contain" />
      </div>
 
      {/* <!-- Best selling --> */}
      <div>
        <h3 class="font-bold text-slate-900 mb-5">Best selling</h3>
        <ul class="space-y-4">
          <li class="flex items-center gap-4">
            <img src="/assets/product-image-13.webp" alt="Interdu Torquent" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-slate-900 text-sm">Interdu Torquent</p>
              <p class="text-slate-500 text-sm mt-1">$15.00</p>
            </div>
          </li>
          <li class="flex items-center gap-4">
            <img src="/assets/product-image-14.webp" alt="Torquent Oduis" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-slate-900 text-sm">Torquent Oduis</p>
              <p class="text-slate-500 text-sm mt-1">$25.00</p>
            </div>
          </li>
          <li class="flex items-center gap-4">
            <img src="/assets/product-image-15.webp" alt="Justo Finibus" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-slate-900 text-sm">Justo Finibus</p>
              <p class="text-slate-500 text-sm mt-1">$35.00</p>
            </div>
          </li>
          <li class="flex items-center gap-4">
            <img src="/assets/product-image-16.webp" alt="Mattis Aliquam" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-slate-900 text-sm">Mattis Aliquam</p>
              <p class="text-slate-500 text-sm mt-1">$30.00 <span class="line-through text-slate-400">$35.00</span></p>
            </div>
          </li>
          <li class="flex items-center gap-4">
            <img src="/assets/product-image-17.webp" alt="Montes Dictum" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-slate-900 text-sm">Montes Dictum</p>
              <p class="text-slate-500 text-sm mt-1">$15.00 <span class="line-through text-slate-400">$20.00</span></p>
            </div>
          </li>
        </ul>
      </div>
 
    </aside>

        </>
    )
}

export default NewsAside;
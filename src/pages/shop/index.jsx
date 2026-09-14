import React,{useState,useEffect,useRef} from 'react'
import Hero from './hero'
import Product from './product/product-list'
import Filter from './filter/filter'
import { useLocation } from "react-router";

const Shop = () => {

  const location = useLocation();

  const productRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToProduct) {
      productRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",

      });
    }
  }, [location.state]);

  return (
    <>
     <Hero/>
     
      <section className="max-w-7xl mx-auto px-6 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
 
    {/* <!-- LEFT: products --> */}
    
<div ref={productRef}
style={{ scrollMarginTop: "4rem" }}
>
        <Product />
      </div>  
    {/* <!-- RIGHT: filters sidebar --> */}
   <Filter/>
 
  </div>
</section>

    </>
  )
}

export default Shop

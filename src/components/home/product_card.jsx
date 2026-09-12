import { NavLink } from "react-router";
import Compare from "../cart_buttons/compare";
import View from "../cart_buttons/view";
import WishList from "../cart_buttons/wishList";

function ProductCard({id, name, category, price, image }){
  

  
    return (
        <>
                  <div
            className="group relative border border-gray-200 rounded-2xl flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* <!-- Icons --> */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <WishList />
              <Compare />
              <View />
            </div>

            {/* <!-- Image --> */}
            <div
              className="overflow-hidden rounded-t-2xl h-56 w-full flex items-center justify-center p-6"
            >
                <img
        src={image ? `http://127.0.0.1:8000/${image}` : "/placeholder.png"}
        alt={name}
        className="w-full h-50  object-contain transition-transform duration-500 ease-out group-hover:scale-110"
      />
            </div>

            {/* <!-- Info --> */}
            <div
              className="flex-1 flex flex-col items-center text-center px-4 pb-4"
            >
              <h3 className="font-bold text-slate-900">{ name }</h3>
              <p className="text-xs text-gray-400 tracking-wide mt-1">{ category }</p>
            </div>

            {/* <!-- Price / Add to cart --> */}
            <div
              className="flex items-center justify-between border-t border-gray-200 px-5 py-4"
            >
              <span className="font-bold text-slate-900">Rs { price }</span>
              <button
                className="text-sm font-semibold text-slate-700 hover:text-yellow-400 cursor-pointer"
              >
                Add to cart
              </button>
            </div>
            <NavLink to={`/product_details/${id}`} className="absolute inset-0 z-0" />
          </div>
        </>
    )
}

export default ProductCard;
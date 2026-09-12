import api from "../utils/http"


// user register
export const userRegister=(post)=>{
    return api.post("/users/user_register",post)
}


//user login
export const userLogin=(post)=>{
    return api.post("/users/login",post)
}

//get all products
export const getProduct=()=>{
    return api.get("/products/all_products")
}

// get images  based on  product id
export const getImage=(id)=>{
    return api.get(`/products/get_images/${id}`)
}


// get single products details
export const getOneProduct=(id)=>{
    return api.get(`/products/one_product/${id}`)
}

//get products/product variants rate and stock 

export const getProductRate=(id)=>{
    return api.get(`/products/one_product_rate/${id}`)
}


//CARTS

//create cart

export const createCart=(post)=>{
    return api.post("/cart/create_cart",post)
}

// get cart

export const getCart=()=>{
    return api.get("/cart/get_cart")
}

// update cart

export const updateCart=(id,post)=>{
    return api.put(`/cart/update_cart/${id}`,post)
}

// delete cart

export const deleteCart=(id)=>{
    return api.delete(`/cart/delete_cart/${id}`)
}

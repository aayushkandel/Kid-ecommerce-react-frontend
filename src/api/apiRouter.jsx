import api from "../utils/http"



export const userRegister=(post)=>{
    return api.post("/users/user_register",post)
}

export const userLogin=(post)=>{
    return api.post("/users/login",post)
}

export const getProduct=()=>{
    return api.get("/products/all_products")
}

export const getImage=(id)=>{
    return api.get(`/products/get_images/${id}`)
}

export const getOneProduct=(id)=>{
    return api.get(`/products/one_product/${id}`)
}
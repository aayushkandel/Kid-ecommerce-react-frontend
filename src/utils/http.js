import axios from "axios";

const api = axios.create({
    baseURL:"/api"
});

api.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem("token")
    if(token){
      config.headers.Authorization=`Bearer ${token}`
    }
    return config;
},
(error)=>Promise.reject(error))

api.interceptors.response.use((response)=>response,(error)=>{
   if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");

      // Remove authorization header
      delete api.defaults.headers.common["Authorization"];

      console.log("Token expired or invalid. Logged out.");
    }

    return Promise.reject(error);
})

export default api;
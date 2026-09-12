import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/home/index.jsx'
import Shop from './pages/shop/index.jsx'
import News from './pages/news/index.jsx'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Header from './components/header/index.jsx'
import LoginForm from './components/user/LoginForm.jsx'
import ProductDetails from './pages/shop/product/productDetails.jsx'
import Cart from './components/cart/Cart.jsx'

const router = createBrowserRouter([
  
    {
      path: "/",
      element: <App />,
      children:[
        {
      path:"/",
      element:<Home/>,
    },
    {
      path: "/shop",
      element: <> <Shop /></>
    },
    {
      path: "/news",
      element: <> <News /></>
    },
    {
      path: "/about",
      element: <><About /></>
    },
    {
      path: "/contact",
      element:<> <Contact /></>
    },
    {
      path: "/login",
      element: <><LoginForm/></>
    },
     {
      path: "/product_details/:id",
      element: <><ProductDetails /></>
    },
     {
      path: "/cart",
      element: <><Cart/></>
    },

      ]

    }
    
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
  </StrictMode>,
)

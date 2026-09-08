import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Button from './Button'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Contact from './pages/contact'
import News from './pages/news'
import Shop from './pages/shop'
import About from './pages/about'
import { BrowserRouter, createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';

function App() {
 


  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[90%]">
          {/* header */}
          <Header />

          <Outlet/>

          <Footer />

        </div>
      </div>
    </>
  )
}

export default App

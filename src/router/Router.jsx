import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SearchResult from '../pages/SearchResult'
import SingleProduct from '../pages/SingleProduct'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import SingleCategory from '../pages/SingleCategory'
import TrackOrder from '../pages/TrackOrder'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search-result/:string" element={<SearchResult/>}/>
        <Route path="/single-product/:slug" element={<SingleProduct/>}/>
        <Route path="/single-category/:slug" element={<SingleCategory/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/track-order" element={<TrackOrder/>}/>
    </Routes>
  )
}

export default Router
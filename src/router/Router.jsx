import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SearchResult from '../pages/SearchResult'
import SingleProduct from '../pages/SingleProduct'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import SingleCategory from '../pages/SingleCategory'
import TrackOrder from '../pages/TrackOrder'
import About from '../pages/About'
import Return from '../pages/Return'
import CustomerReview from '../pages/CustomerReview'
import { Privacy } from '../pages/Privacy'

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search-result/:string" element={<SearchResult/>}/>
        <Route path="/single-product/:slug" element={<SingleProduct/>}/>
        <Route path="/single-category/:slug" element={<SingleCategory/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/track-order" element={<TrackOrder/>}/>
        <Route path="/return-and-refund" element={<Return/>}/>
        <Route path="/customer-review" element={<CustomerReview/>}/>
        <Route path="/privacy-policy" element={<Privacy/>}/>
    </Routes>
  )
}

export default Router
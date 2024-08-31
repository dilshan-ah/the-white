import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import useScrollToTop from '../hooks/UseScrollToTop';
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
import Account from '../pages/Account';
import { DataContext } from '../../context/Context';
import CheckoutRoute from './CheckoutRoute';
import SignInUp from '../pages/SignInUp';

const Router = () => {
  useScrollToTop();
  const { cart } = useContext(DataContext)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-result/:string" element={<SearchResult />} />
      <Route path="/single-product/:slug" element={<SingleProduct />} />
      <Route path="/single-category/:slug" element={<SingleCategory />} />
      <Route element={<CheckoutRoute cart={cart} />}>
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/return-and-refund" element={<Return />} />
      <Route path="/customer-review" element={<CustomerReview />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/my-account" element={<Account />} />
      <Route path="/sign-up-in" element={<SignInUp />} />
    </Routes>
  )
}

export default Router
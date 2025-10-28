import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../views/HomePage/Home'
import Categories from '../../views/CategoryPage/Categories'
import Layout from '../../Layout'
import ProductDetail from '../../views/ProductPage/ProductDetails'
import VerifyMedicine from '../../views/VerifyMedicinePage/VerifyMedicine'
import Complaints from '../../views/ComplaintPage/Complaints'
import Cart from '../../views/CartPage/Cart'
import Checkout from '../../views/CheckoutPage/Checkout'
import LoadingPage from '../../components/ui/Animation/LoadingPage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element= {<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='categories' element={<Categories/>}/>
        <Route path='product/:id' element={<ProductDetail/>}/>
        <Route path='verify' element={<VerifyMedicine/>}/>
        <Route path='complaint' element={<Complaints/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='animation' element={<LoadingPage/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter

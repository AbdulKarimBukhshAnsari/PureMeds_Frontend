import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../views/HomePage/Home'
import Categories from '../../views/CategoryPage/Categories'
import Layout from '../../Layout'
import ProductDetail from '../../views/ProductPage/ProductDetails'
import VerifyMedicine from '../../views/VerifyMedicinePage/VerifyMedicine'
import Complaints from '../../views/ComplaintPage/Complaints'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element= {<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='categories' element={<Categories/>}/>
        <Route path='product/:id' element={<ProductDetail/>}/>
        <Route path='verify' element={<VerifyMedicine/>}/>
        <Route path='complaint' element={<Complaints/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter

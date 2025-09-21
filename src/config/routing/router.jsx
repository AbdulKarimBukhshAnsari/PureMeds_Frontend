import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../views/HomePage/Home'
import Categories from '../../views/CategoryPage/Categories'
import Layout from '../../Layout'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element= {<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='categories' element={<Categories/>}/>
        </Route>
    </Routes>
  )
}

export default AppRouter

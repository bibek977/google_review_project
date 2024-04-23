import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import SearchCompany from '../components/SearchCompany'
import ConnectCompany from '../components/ConnectCompany'

const Router = ({children}) => {
    const routes = createBrowserRouter([
        {
            path : '/',
            element : <Home></Home>
        },
        {
            path : '/search',
            element : <SearchCompany></SearchCompany>
        },
        {
            path : '/connect',
            element : <ConnectCompany></ConnectCompany>
        },
    ])

  return (
    <RouterProvider router={routes}>
        {children}
    </RouterProvider>
  )
}

export default Router
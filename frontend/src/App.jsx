import React from 'react'
import QueryProvider from './providers/QueryProvider'
import Home from './pages/Home'
import SearchCompany from './components/SearchCompany'
import ConnectCompany from './components/ConnectCompany'

const App = () => {
  return (
    <QueryProvider>
      {/* <Home></Home> */}
      {/* <SearchCompany></SearchCompany> */}
      <ConnectCompany></ConnectCompany>
    </QueryProvider>
  )
}

export default App
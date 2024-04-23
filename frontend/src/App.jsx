import React from 'react'
import QueryProvider from './providers/QueryProvider'
import Home from './pages/Home'
import SearchCompany from './components/SearchCompany'
import ConnectCompany from './components/ConnectCompany'
import Router from './providers/Router'

const App = () => {
  return (
      <QueryProvider>
        <Router>
        </Router>
      </QueryProvider>
  )
}

export default App
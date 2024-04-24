import React from 'react'
import QueryProvider from './providers/QueryProvider'
import Home from './pages/Home'
import SearchCompany from './components/SearchCompany'
import ConnectCompany from './components/ConnectCompany'
import Router from './providers/Router'
import {SettingsProvider} from './providers/SettingsProvider'

const App = () => {
  return (
      <QueryProvider>
        <SettingsProvider>
        <Router>

        </Router>
        </SettingsProvider>
      </QueryProvider>
  )
}

export default App
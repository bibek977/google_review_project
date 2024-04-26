import React from 'react'
import QueryProvider from './providers/QueryProvider'
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
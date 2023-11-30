import React from 'react'
import './App.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'

import RootStore from './store/rootStore'
import { Provider } from 'mobx-react'

const App = (): any => {
  return (
    <Provider store={RootStore}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './screens/Dashboard'
import Success from './screens/Success'
import Cancel from './screens/Cancel'
import Subscription from './screens/Subscription'

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
      <Route path='/subscription' element={<Subscription />} />
    </Routes>
  )
}

export default AppRoutes

import React from 'react'
//outlet will handle the components we will pass as a props
import {Navigate, Outlet} from 'react-router-dom'

function PrivateComp() {
  const auth = localStorage.getItem("token")
  return auth ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateComp;

import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
import Nav from './components/Nav'
import Signup from './components/Signup'
import Login from './components/Login'
import PrivateComp from './components/PrivateComp'

function App() {


  return (
    <div>
      <BrowserRouter>
      <Nav/> 

      <Routes>
        <Route element={<PrivateComp/>}>
        <Route path='/' element={<Users/>}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/update/:id' element={<UpdateUser/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
  

  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/signin' element={<Signin></Signin>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

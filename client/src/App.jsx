import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs'
import CourseList from './pages/courses/CourseList'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/user/signup' element={<SignUp/>}></Route>
        <Route path='/user/login' element={<Login/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App

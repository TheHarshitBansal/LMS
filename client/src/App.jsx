import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequireAuth from './components/RequireAuth'
import AboutUs from './pages/AboutUs'
import ChangePassword from './pages/ChangePassword'
import ChangeResetPassword from './pages/ChangeResetPassword'
import ContactUs from './pages/Contact'
import CourseDescription from './pages/courses/CourseDescription'
import CourseList from './pages/courses/CourseList'
import CreateCourse from './pages/courses/CreateCourse'
import EditProfile from './pages/EditProfile'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Checkout from './pages/payments/Checkout'
import Profiles from './pages/Profiles'
import ResetPassword from './pages/ResetPassword'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        <Route path='/user/signup' element={<SignUp/>}></Route>
        <Route path='/user/login' element={<Login/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/courses/details' element={<CourseDescription/>}></Route>
        <Route path='/user/forgot-password' element={<ResetPassword/>}></Route>
        <Route path='/user/reset/:resetId' element={<ChangeResetPassword/>}></Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
          <Route path='/courses/create' element={<CreateCourse/>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['USER']}/>}>
          <Route path='/checkout' element={<Checkout/>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']}/>}>
          <Route path='/user/profile' element={<Profiles/>}></Route>
          <Route path='/user/edit' element={<EditProfile/>}></Route>
          <Route path='/user/change-password' element={<ChangePassword/>}></Route>
        </Route>

        <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App

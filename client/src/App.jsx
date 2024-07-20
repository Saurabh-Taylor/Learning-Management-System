import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import NotFound from './Pages/NotFound'
import SignupPage from './Pages/SignupPage'
import SignInPage from './Pages/SigninPage'
import CourseList from './Pages/Course/CourseList'
import ContactPage from './Pages/ContactPage'
import DeniedPage from './Pages/DeniedPage'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import UserProfile from './Pages/User/UserProfile'
import EditProfile from './Pages/User/EditProfile'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}  />
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<SignInPage/>}/>
      <Route path='/courses' element={<CourseList/>}/>
      <Route path='/courses/description' element={<CourseDescription/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/denied' element={<DeniedPage/>}/>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/courses/create' element={<CreateCourse/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN" , "USER"]} />}>
        <Route path='/user/profile' element={<UserProfile/>}/>
        <Route path='/user/editprofile' element={<EditProfile/>}/>
      </Route>


      <Route path='*' element={<NotFound/>} ></Route>
    </Routes>
  )
}

export default App

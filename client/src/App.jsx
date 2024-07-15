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

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}  />
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<SignInPage/>}/>
      <Route path='*' element={<NotFound/>} ></Route>
    </Routes>
  )
}

export default App

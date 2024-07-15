import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}  />
      <Route path='/about' element={<AboutPage/>}  />
    </Routes>
  )
}

export default App

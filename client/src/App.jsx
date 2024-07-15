import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}  />
    </Routes>
  )
}

export default App

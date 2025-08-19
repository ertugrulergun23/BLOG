import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Landing from './Pages/Landing'
import BlogDetail from './Pages/BlogDetail'
import Profile from './Pages/Profile'
import Explore from './Pages/Explore'
import Login from './Pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Landing/>}/>
          <Route path='/deneme' element={<BlogDetail/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/explore' element={<Explore/>}/>
        </Route>
        <Route path='/signup' element={<Login/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App

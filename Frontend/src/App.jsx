import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Landing from './Pages/Landing'
import BlogDetail from './Pages/BlogDetail'
import Profile from './Pages/Profile'
import Explore from './Pages/Explore'
import Login from './Pages/Login'
import AddBlog from './Pages/AddBlog'
import CompleteProfile from './Pages/CompleteProfile'
import { useEffect } from 'react'
import { StartProtocol } from './Context/UseAuthApi'

function App() {

  useEffect(()=>{
    StartProtocol()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Landing/>}/>
          <Route path='/blog/:id' element={<BlogDetail/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/addblog' element={<AddBlog/>}/>
        </Route>
        <Route path='/signup' element={<Login/>}/>
        <Route path='/complete-profile' element={<CompleteProfile/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App

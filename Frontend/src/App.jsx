import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Landing from './Pages/Landing'
import BlogDetail from './Pages/BlogDetail'
import Profile from './Pages/Profile'
import Explore from './Pages/Explore'
import Login from './Pages/Login'
import AddBlog from './Pages/AddBlog'
import { useContext, useEffect } from 'react'
import {UserContext} from './Context/UserContext'
import CompleteProfile from './Pages/CompleteProfile'

function App() {


  //Context API'dan çekilen bilgiler
  const {islogged , setIslogged , setProfile} = useContext(UserContext)

  // Tokena göre Usere API dan çekecek olan fonksiyon
  const fetchUser = async (token)=>{
    if(token){
    const response = await fetch('http://localhost:8000/api/profiles/me/',{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${localStorage.getItem('AuthToken')}`
      }
    })
    const userData = await response.json()
    return userData;
    }
  }

  // Uygulama başlatıldığında localStorage'ı kontrol eden fonksiyon 
  const StartProtocol = async ()=>{
    const token = localStorage.getItem('AuthToken')
    if(token){
      await setIslogged(true)
      console.log(islogged)
      const response = await fetchUser(token)
      console.log(response)
      await setProfile(response)
      
    }else{
      await setIslogged(false)
    }
  }


  // Uygulamanın başlama protokülünü gerçekleştirecek life-cycle fonksiyon
  useEffect(()=>{
    StartProtocol()
  },[])



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Landing/>}/>
          <Route path='/deneme' element={<BlogDetail/>} />
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

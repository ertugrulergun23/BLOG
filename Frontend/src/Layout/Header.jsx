import React, { useState,useContext, useEffect} from 'react'
import logo from '../assets/Blog_logo.png'
import { Search , X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';


function Header() {
  const [filter,setFilter] = useState("");// Arama çubuğu ile yapılacak filtreleme için state
  const navigate = useNavigate()

  // Context API dan çekilen veriler
  const {islogged,profile} = useContext(UserContext)

  // Kontrol fonksiyonu
  useEffect(()=>{
    if(islogged){
      console.log(islogged)
      console.log(profile)
    }
  },[islogged])

  // Header kısmındaki link bileşenleri
  const Link = ({text,url})=>{
    return (
      <div className='group overflow-hidden'>
        <div className='border border-white translate-x-72 group-hover:translate-x-0 transition-all duration-500 ease-in-out'></div>
        <div className='flex'>
          <div className='border border-white -translate-y-72 group-hover:translate-y-0 transition-all duration-500 ease-in-out'></div>
          <div className='m-1 cursor-pointer text-xl group-hover:text-2xl transition-all duration-400 select-none text-white' onClick={()=>{navigate(url)}}>{text}</div>
          <div className='border border-white translate-y-72 group-hover:translate-y-0 transition-all duration-500 ease-in-out'></div>
        </div>
        <div className='border border-white -translate-x-72 group-hover:translate-x-0 transition-all duration-500 ease-in-out'></div>
      </div>
    )
  }



  return (
    <div className='z-90 fixed w-full h-13 bg-green-600 flex items-center justify-between px-10'>
        <div className='h-10/12'>
          <img src={logo} alt='logo' className='h-full'/>
        </div>
        <div className='flex justify-between w-9/12' >
          <Link text={"Anasayfa"} url={"/"}/>
          <Link text={"Keşfet"} url={"/explore"}/>
          <Link text={"Hakkında"} url={"/about"}/>
          <Link text={islogged ? profile.name:'Giriş Yap/Kaydol'} url={islogged ? `profile`:'signup'}/>
        </div>
        <div className='relative'>
          <Search className='absolute h-full text-gray-500'/> 
          <input type='text' className='w-full h-6 bg-white rounded-xl px-6 py-4 focus:outline-0' placeholder='Aramak için bir şey yazın' value={filter} onChange={(e)=>setFilter(e.target.value)}/>
          <X className={`absolute top-1 right-0 text-gray-500 cursor-pointer ${filter==="" ? 'text-white' : 'text-gray-600'}`} onClick={()=>setFilter("")}/>
        </div>
    </div>
  )
}

export default Header
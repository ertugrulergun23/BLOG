import React, { useState } from 'react'
import logo from '../assets/react.svg'
import { Search , X } from 'lucide-react';


function Header() {
  const [filter,setFilter] = useState("");// Arama çubuğu ile yapılacak filtreleme için state

  // Header kısmındaki link bileşenleri
  const Link = ({text,url})=>{
    return (
      <div className='group overflow-hidden'>
        <div className='border border-black translate-x-72 group-hover:translate-x-0 transition-all duration-500 ease-in-out'></div>
        <div className='flex'>
          <div className='border border-black -translate-y-72 group-hover:translate-y-0 transition-all duration-500 ease-in-out'></div>
          <div className='m-1 cursor-pointer text-xl group-hover:text-2xl transition-all duration-400 select-none'>{text}</div>
          <div className='border border-black translate-y-72 group-hover:translate-y-0 transition-all duration-500 ease-in-out'></div>
        </div>
        <div className='border border-black -translate-x-72 group-hover:translate-x-0 transition-all duration-500 ease-in-out'></div>
      </div>
    )
  }



  return (
    <div className='z-20 fixed w-full h-13 bg-green-600 flex items-center justify-between px-10'>
        <div>
          <img src={logo} alt='logo'/>
        </div>
        <div>
          <Link text={"yazı"} />
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
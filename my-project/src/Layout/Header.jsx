import React from 'react'
import reactfoto from '../assets/react.svg'
import { useNavigate } from 'react-router-dom'
import { UserRound } from 'lucide-react';

function Header() {
    const navigate=useNavigate();


    const PageLink=({text,link})=>{
        return (
            <div className='group overflow-hidden'>
                <div className='border transform translate-x-32 transition-all duration-500 group-hover:translate-x-0'></div>
                <div className='flex'>
                    <div className='border transform -translate-y-32 transition-all duration-500 group-hover:-translate-y-0'></div>
                    <a href={link} className='group-hover:text-xl transition-all duration-400 group-hover:opacity-90'>{text}</a>
                    <div className='border transform translate-y-32 transition-all duration-500 group-hover:translate-y-0'></div>
                </div>
                <div className='border transform -translate-x-32 transition-all duration-500 group-hover:-translate-x-0'></div>
            </div>
        )
    }


  return (
    <div className='w-full bg-emerald-600 flex flex-row justify-around items-center'> 
      <div className="w-1/12 cursor-pointer rounded-[5px] p-2" onClick={()=>{navigate('/')}}><img src={reactfoto} alt='logo' className='w-full h-full animate-spin'/></div>
      <div className="w-1/2  rounded-[5px] flex justify-between">
        <PageLink text={'Anasayfa'} link={'/'}/>
        <PageLink text={'Bloglar'} link={'/blogs'} />
        <PageLink text={'Anasayfa'} link={'/'}/>
      </div>
      <div className="w-3/12 flex justify-center items-center">
        <button className='text-sm whitespace-nowrap rounded-[5px} p-1 cursor-pointer active:outline rounded-[5px] active:text-white'>Login/Register</button>
        <div className='cursor-pointer'><UserRound/></div>
      </div>
    </div>
  )
}

export default Header

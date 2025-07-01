import React from 'react'
import { ChevronRight , ChevronLeft } from 'lucide-react';
import reactsvg from '../assets/react.svg';

function Home() {
  return (
    <div>
      <div className="relative group w-full h-100 bg-blue-500 flex items-center">
        <div className='w-full h-full flex items-center justify-center overflow-hidden'>
          <img src={reactsvg} alt='resim' className='w-full h-full'/>
          <img src={reactsvg} alt='resim' className='w-full h-full'/>
          <img src={reactsvg} alt='resim' className='w-full h-full'/>
        </div>
        <div className="absolute w-full flex justify-between">
          <button className='cursor-pointer opacity-10 group-hover:opacity-100 hover:button-hover-background'><ChevronLeft size={40}/></button>
          <button className='cursor-pointer opacity-10 group-hover:opacity-100 hover:button-hover-background'><ChevronRight size={40}/></button>
        </div>
      </div>
    </div>
  )
}

export default Home

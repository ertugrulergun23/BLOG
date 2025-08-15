import React, { useEffect, useRef } from 'react'
import HeroSectionFoto from '../assets/HeroSectionFoto.png'
import gsap from 'gsap'

function Landing() {
  const HeroFoto = useRef(null)

  useEffect(()=>{
    gsap.to(
      HeroFoto.current, {
      scale: 1, 
      duration: 0.6, 
      ease: "back.out(1.7)"
    });
  },[])



  // Landing pagede bulunan hero section componenti 
  // HeroSection ın mobil görünümünde sorunlar var düzeltilmesi gerekiyor . 
  const HeroSection =() =>{
    return (
      <div className='relative w-full h-screen HeroBackgroundColor flex justify-between items-center pt-13 z-10'>
        <div className='w-full md:w-1/2 h-full flex flex-col items-center justify-around'>
          <p className='text-6xl w-10/12'>
            SEN DE HEYECANINI , MUTLULUKLARINI VE DENEYİMLERİNİ PAYLAŞ!<br></br>
            YENİ İNSANLAR TANI ! 
          </p>
          <button className='group border border-green-600 px-2 py-4 rounded-xl bg-green-600 cursor-pointer '>
            <p className='text-xl text-white group-hover:text-2xl transition-all duration-300 group-hover:animate-bounce'>Hemen Kaydol</p>
          </button>
        </div>
        <div className='absolute md:static md:w-1/2 flex items-center -z-10 h-full'>
          <img ref={HeroFoto} src={HeroSectionFoto} alt='resim' className='w-full opacity-40 md:opacity-100 scale-0'/>
        </div>
      </div>
    )
  }





















  return (
    <div className='relative w-full'>
        <HeroSection/>
    </div>
  )
}

export default Landing
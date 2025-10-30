import React, { useEffect, useRef, useState } from 'react'
import HeroSectionFoto from '../assets/HeroSectionFoto.png'
import foto2 from '../assets/react.svg'
import foto3 from '../assets/LoginBackground.png'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Landing() {
  const HeroFoto = useRef(null)
  const [no,setNo] = useState(0)

  useEffect(()=>{
    gsap.to(
      HeroFoto.current, {
      scale: 1, 
      duration: 0.6, 
      ease: "back.out(1.7)"
    });
  },[])

  // Carousel için örnek veri 
  const data = [
    HeroSectionFoto,
    foto2,
    foto3
  ]

  // Carousel ileri/geri fonksiyonları 
  const nextImage = () => {
    if( no >= data.length -1){
      setNo(0)
    }else{
      setNo(no+1)
    }
  }

  const prevImage = () => {
    if(no <= 0){
      setNo(data.length - 1)
    }else{
      setNo(no - 1)
    }
  }


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

  // Ana sayfadaki carousel bileşeni Transition sorunu düzeltilecek
  const Carousel = () => {
    return (
      <div className='w-full h-screen HeroBackgroundColor relative flex flex-col items-center justify-center transition-all duration-100 ease-in-out'>
        <div className='absolute z-20 w-full flex justify-between px-10'>
          <button onClick={prevImage} className='cursor-pointer opacity-50 hover:opacity-100 hover:bg-green-50 rounded-4xl '><ChevronLeft  size={50}/></button>
          <button onClick={nextImage} className='cursor-pointer opacity-50 hover:opacity-100 hover:bg-green-50 rounded-4xl '><ChevronRight size={50}/></button>
        </div>
        <div className='relative z-10 w-10/12 h-10/12 border border-black overflow-hidden'>
          <div className='flex h-full transition-all duration-500 ease-in-out' style={{transform:`translateX(-${no*100}%)`}}>
            {
              data.map((dat,index)=>{
                return (
                  <div className='min-w-full h-full' key={index}>
                    <img src={dat} className='w-full h-full'/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='relative z-10 w-full flex items-center justify-center mt-2'>
            {
              data.map((dat,index) => {
                return (
                  <div key={index} className={`w-4 h-4 rounded-2xl m-2 cursor-pointer transition-all duration-100 ease-in-out ${no===index ? 'bg-gray-500 w-6':'bg-gray-300'}`} onClick={()=>{setNo(index)}}></div>
                )
              })
            }
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
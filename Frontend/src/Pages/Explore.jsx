import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import { ChevronsDown, Search } from 'lucide-react';
import {CircularProgress} from '@mui/material';

        

function Explore() {
  const [datas , setDatas] = useState()
  const [isLoading , setIsLoading] = useState(false)
  /*
    Sayfaya backend bağlanacak ve arama çubuğu aktif hale getirilecek .
  */


  // Önerilen veya aranan blogları gösterecek bileşen
  const ExploreBlogTemplate = ({data}) => {
    return (
      <div className='flex justify-between w-5/12 h-50 m-5 rounded-[5px] box-shadow cursor-pointer'>
        <div className='w-3/12 m-1'><img src={data.image} className='h-full'/></div>
        <div className='w-9/12 m-1 flex flex-col items-center'>
          <div className='w-full h-3/12 flex justify-between items-center px-2'>
            <h1 className='text-3xl'>{data.tittle}</h1>
            <div><Rating name="half-rating-read" defaultValue={data.point} precision={0.5} readOnly /></div>
          </div>
          <p className='h-7/12 overflow-hidden text-xl px-2'>
            {data.content}
          </p>
          <button className='h-1/12 text-gray-500 flex items-center text-lg p-3 cursor-pointer'>
            <span>devamını oku</span> <ChevronsDown size={20}/>
          </button>
        </div>
      </div>
    )
  }

  // Arama kutucuğu bileşeni
  const SearchBarTemplate = () => {
    return (
      <div className='w-8/12 flex items-center bg-white rounded-xl border border-black'>
        <div className=''>
          <Search size={35}/>
        </div>
          <input type='text' className='h-full w-full focus:outline-0 p-1 text-xl' placeholder='Aramak için bir şey yazın'/>
      </div>
    )
  }

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/blogs')
    .then(response => response.json())
    .then(data =>{
      setDatas(data)
      setIsLoading(true)
    })
    .catch(error => alert(error))
  },[])




  return (
    <div className='pt-13'>
      <div className='w-full min-h-screen flex flex-col'>
        <div className='w-full h-16 flex items-center justify-center'>
          <SearchBarTemplate/>
        </div>
        {/* Önerilen bloglar kısmının başlangıcı */}
        {
          isLoading ? 
                  <div>
        <h1 className='text-5xl text-gray-500 ms-5'>En son eklenenler</h1>
        <div className='w-full flex flex-wrap justify-center'>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
        </div>
        <h1 className='text-5xl text-gray-500 ms-5'>En yüksek puanı alanlar</h1>
        <div className='w-full flex flex-wrap justify-center'>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
        </div>
        <h1 className='text-5xl text-gray-500 ms-5'>En çok yorum alanlar</h1>
        <div className='w-full flex flex-wrap justify-center'>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
          <ExploreBlogTemplate data={datas[0]}/>
          <ExploreBlogTemplate data={datas[1]}/>
        </div>
        </div>
        :
        <div className='w-full h-12 flex items-center justify-center'>
          <CircularProgress
            color="success"
            determinate={false}
            size="lg"
            variant="soft"
          />
        </div>
        }
        {/* Önerilen bloglar kısmının bitişi */}
      </div>
    </div>
  )
}

export default Explore
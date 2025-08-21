import React from 'react'
import { Rating } from '@mui/material'
import { ChevronsDown } from 'lucide-react';

function Explore() {

  const ExploreBlogTemplate = () => {
    return (
      <div className='flex justify-between min-w-10/12 h-50 m-5 rounded-[5px] box-shadow cursor-pointer'>
        <div className='w-3/12 m-1'>resim</div>
        <div className='w-9/12 m-1 flex flex-col items-center'>
          <div className='w-full h-3/12 flex justify-between items-center px-2'>
            <h1 className='text-3xl'>başlık</h1>
            <div><Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /></div>
          </div>
          <p className='h-7/12 overflow-hidden text-xl px-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nemo tenetur dolor cupiditate voluptatum sequi, voluptas eum voluptatem totam, assumenda porro a, eos eligendi odit dolorem facilis alias officiis in nihil tempora! Est nostrum voluptatum perspiciatis enim, deserunt dicta! Dolor, dolorum. Delectus itaque quibusdam sint eos nam voluptas non mollitia deserunt alias, laboriosam nostrum quam aperiam, quasi perspiciatis odit aut quia laborum vero omnis ipsa repudiandae? Eius molestiae necessitatibus laudantium explicabo atque unde hic culpa nemo laboriosam reiciendis blanditiis ex dolor illo quisquam beatae vitae quaerat optio aliquid ducimus, excepturi incidunt doloremque magnam veniam quis. Voluptates rerum nemo quis sed!
          </p>
          <button className='h-1/12 text-gray-500 flex items-center text-lg p-3 cursor-pointer'>
            <span>devamını oku</span> <ChevronsDown size={20}/>
          </button>
        </div>
      </div>
    )
  }




  return (
    <div className='pt-13'>
      <div className='w-full min-h-screen flex flex-col'>
        <h1 className='text-5xl text-gray-500'>En son eklenenler</h1>
        <div className='w-full flex overflow-hidden'>
          <ExploreBlogTemplate/>
          <ExploreBlogTemplate/>
          <ExploreBlogTemplate/>
        </div>
        <h1 className='text-5xl text-gray-500'>En yüksek puanı alanlar</h1>
        <div>
          bileşenler
        </div>
        <h1 className='text-5xl text-gray-500'>En çok yorum alanlar</h1>
        <div>
          bileşenler
        </div>
      </div>
        
    </div>
  )
}

export default Explore
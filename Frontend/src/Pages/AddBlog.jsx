import React from 'react'

function AddBlog() {
  return (
    <div className='pt-13 w-full flex flex-col items-center justify-center'>
        <div className='w-10/12 flex'>
            <label className='w-3/12 text-2xl'>Blog Başlığını Giriniz : </label>
            <input type='text' className='w-9/12 border border-black p-1 rounded-md text-xl focus:outline-0'/>
        </div>
        <div className='w-10/12 flex'>
            <label className='w-3/12 text-2xl'>Blog Resmini Yükleyiniz : </label>
            <input type='file' className='w-9/12 border border-black p-1 rounded-md text-xl'/>
        </div>
        <div>içerik</div>
        <div className='w-10/12 flex'>
            <label className='w-3/12 text-2xl'>Blog Etiketlerini Giriniz : </label>
            <input type='text' placeholder='Etiketleri virgül ile ayırınız ! Sadece alakalı etiketleri girmeye özen gösteriniz !' className='w-9/12 border border-black p-1 rounded-md text-xl focus:outline-0'/>
        </div>
        <div className='w-1/2 flex flex-row items-center justify-between'>
            <button className='p-3 text-xl rounded-xl font-bold bg-green-400 text-white cursor-pointer hover:bg-green-500' >Kaydet</button>
            <button className='p-3 text-xl rounded-xl font-bold bg-green-400 text-white cursor-pointer hover:bg-green-500' >Kaydet ve Yayınla</button>

        </div>
    </div>
  )
}

export default AddBlog
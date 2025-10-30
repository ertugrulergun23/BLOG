import React, { useState } from 'react'
import { Editor } from 'primereact/editor';


/*
    - Kaydet ve yayınla butonu düzenlenecek 
    - API isteği handle edilecek 
    - Editördeki Toolbar düzeltilecek
*/

function AddBlog() {
    const [header,setHeader] = useState('');// Başlık kısmındaki yazıyı tutacak state
    const [text,setText] = useState('');// İçerik kısmındaki yazıyı tutacak state
    const [photo,setPhoto] = useState(null);//Fotoğrafı tutacak state

    const handleHeaderChange = (e)=>{
        const value = e.target.value.toUpperCase()
        setHeader(value)
    }

  return (
    <div className='pt-13 w-full min-h-screen flex flex-col items-center justify-around'>
        <div className='w-10/12 h-1/4 flex flex-col items-center justify-center'>
            <label className='w-full text-center text-2xl'>Önce Bir Başlık Belirleyelim</label>
            <input value={header} onChange={handleHeaderChange} type='text' className='w-9/12 border border-black p-2 rounded-md text-2xl focus:outline-0 text-center'/>
        </div>
        <div className='w-10/12 h-1/4 flex flex-col items-center justify-center'>
            <label className='w-full text-center text-2xl'>Güzel De Bir Fotoğraf Koyduk Mu</label>
            <input value={photo} onChange={(e)=>setPhoto(e.target.value)} type='file' className='w-9/12 border border-black p-1 rounded-md text-xl'/>
        </div>
        <div className='w-10/12 h-1/4 flex flex-col items-center'>
            <label className='w-full text-center text-2xl'>Bloğunuzu Yazmaya Hazırsınız </label>
            <Editor value={text} onTextChange={(e)=>{setText(e.htmlValue)}} className='w-9/12'/>
        </div>
        <div className='w-1/2 h-1/4 flex flex-row items-center justify-between'>
            <button className='p-3 text-xl rounded-xl font-bold bg-green-400 text-white cursor-pointer hover:bg-green-500' >Kaydet</button>
            <button className='p-3 text-xl rounded-xl font-bold bg-green-400 text-white cursor-pointer hover:bg-green-500' >Kaydet ve Yayınla</button>

        </div>
    </div>
  )
}

export default AddBlog
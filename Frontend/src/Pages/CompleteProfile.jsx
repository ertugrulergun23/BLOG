import React, { useState } from 'react'
import { Editor } from 'primereact/editor';
        

function CompleteProfile() {
    const [name,setName] = useState('');// İsmi tutacak state
    const [surname,setSurname] = useState('');// Soyismi tutacak state
    const [bio,setBio] = useState('');//Biyografiyi tutacak state
    const [date,setDate] = useState();//Doğum gününü tutacak state
    const [avatar,setAvatar] = useState();//Profil fotoğrafını tutacak state

  return (
    <div className='min-h-screen HeroBackgroundColor flex flex-col items-center'>
        <div className='w-full text-center text-3xl p-5'>Bu Sayfada Profilini Tamamlayarak Blog Macerana Başlayabilirsin</div>
        <div className='w-5/12 h-1/6 flex flex-col items-center'>
            <label className='text-2xl'>Ad</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type='text' className='box-shadow text-xl rounded p-2 focus:outline-0 text-center'/>
        </div>
         <div className='w-5/12 h-1/6 flex flex-col items-center'>
            <label className='text-2xl'>Soyad</label>
            <input value={surname} onChange={(e)=>setSurname(e.target.value)} type='text' className='box-shadow text-xl rounded p-2 focus:outline-0 text-center'/>
        </div>
        <div className='w-5/12 h-1/6 flex flex-col items-center'>
            <label className='text-2xl'>Profil Resmi</label>
            <input value={avatar} onChange={(e)=>setSurname(e.target.value)} type='file' className='box-shadow p-2 rounded text-2xl'/>
        </div>
        <div className='w-5/12 h-1/6 flex flex-col items-center'>
            <label className='text-2xl'>Doğum Tarihi</label>
            <input value={date} onChange={(e)=>setSurname(e.target.value)} type='date' className='box-shadow p-2 rounded text-2xl'/>
        </div>
         <div className='w-5/12 h-1/6 flex flex-col items-center'>
            <label className='text-2xl'>Biyografi</label>
            <textarea value={bio} onChange={(e)=>setSurname(e.target.value)} className='box-shadow w-9/12 text-2xl p-2 focus:outline-0'></textarea>
        </div>
        <div className='h-1 pt-5'>
            <button className='bg-green-500 text-white p-4 rounded text-xl cursor-pointer hover:bg-green-400'>TAMAMLA</button>
        </div>
    </div>
  )
}

export default CompleteProfile
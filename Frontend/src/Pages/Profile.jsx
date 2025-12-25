import React, { useContext, useEffect, useState } from 'react'
import ProfilePhoto from '../assets/react.svg'
import Rating from '@mui/material/Rating';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GetUser,GetUserBlogs } from '../Context/UseAuthApi';
import { ProgressSpinner } from 'primereact/progressspinner';

/*
  - Kullanıcı adı , ad , soyad , biyografi , avatar , doğum tarihi API ile profillden alınacak
  - Yazılan bloglara erişilebilecek 
  - AddBlog sayfasına yönlendirme eklenecek 

*/

function Profile() {
  const [profile,SetProfile] = useState(null)  // Gelen isteği tutacak state (Kullanıcı profili için)
  const [blogs,SetBlogs] = useState([])      // Gelen isteği tutacak state (Kullanıcı Blogları için)
  const [loading,SetLoading] = useState(false) // API istek gelme durumu 
  const navigate = useNavigate()               // Url yönlendirme fonksiyonu 

  useEffect(()=>{
    const fetchUser = async () => {
      const userData = await GetUser()
      await SetProfile(userData)
      const userBlogs = await GetUserBlogs()
      await SetBlogs(userBlogs)
      await SetLoading(true)
    }
    fetchUser()
  },[])



  // Profil bilgilerinin gösterileceği component
  const ProfileTemplate = () => {
    if(!loading){
      return (
        <ProgressSpinner/>
      )
    }
    return (
      <div className='w-full flex p-4'>
        <div className='w-3/12 p-4'>
          <img src={profile.avatar} alt='profil resmi' className='w-full'/>
        </div>
        <div className='w-9/12 flex flex-wrap'>
          <p className='w-full text-2xl'>KULLANICI ADI : {profile.user.username} </p>
          <p className='w-full text-2xl'>AD : {profile.name}</p>
          <p className='w-full text-2xl'>SOYAD : {profile.surname} </p>
          <p className='w-full text-2xl'>DOĞUM TARİHİ : {profile.birth_date}</p>
          <p className='w-full text-2xl'>BİYOGRAFİ :</p>
          <p className='w-full text-2xl box-shadow px-2 py-3 rounded'>{profile.bio}</p>
        </div>
      </div>
    )
  }

  // Profil kısmında gösterilen blogların bileşeni 
  const BlogTemplate = ({blog}) => {
    return (
      <div className='flex w-96 p-2 rounded-2xl box-shadow cursor-pointer transition-all duration-100 hover:scale-125 m-6' onClick={(e)=>navigate(`/blog/${blog.id}`)}>
        <div className='w-1/4'><img src={blog.image} alt='resim'className='w-full rounded'/></div>
        <div className='w-3/4 flex flex-col items-center justify-around'>
          <p>{blog.tittle}</p>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </div>
      </div>
    )
  }

  // Profil kısmında gösterilen yorumların bileşeni 
  const CommentTemplate = () => {
    return (
      <div className='w-80 p-2 rounded-2xl box-shadow'>
        <h1 className='text-2xl'>
          İsim
        </h1>
        <hr />
        <div>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat earum veritatis aperiam possimus libero voluptas sapiente repellendus cupiditate illum perferendis!
        </div>
      </div>
    )
  }


  // Profilden çıkış yapacak fonksiyon
  const quitProfile = async ( )=>{
    localStorage.clear()
    navigate('/')
  }





  return (
    <div className='pt-13'>
      <div  className='w-full h-10 px-10 py-6 flex items-center justify-between'>
        <button 
          className='rounded px-4 py-2 box-shadow cursor-pointer flex bg-green-600 text-white hover:scale-110 transition-all duration-200'
          onClick={(e)=>navigate('/addblog')}
        >
          <Plus/>
          Blog Ekle
        </button>
        <button 
          className='px-4 py-2 rounded box-shadow bg-red-600 text-white font-bold cursor-pointer hover:scale-110 transition-all duration-200'
          onClick={quitProfile}
        >
          Çıkış Yap
        </button>

      </div>
      {/* Kullanıcının basit düzeyde profil bilgilerinin görüleceği kısım */}
      <ProfileTemplate/>
      {/* KUllanıcının yazdığı blogların görüneceği kısım */}
      <div className='w-full flex flex-wrap justify-around p-6'>
        {
          !loading ? <ProgressSpinner/>:
            blogs.map((blog)=>(
              <BlogTemplate blog={blog}/>
            ))
        }
      </div>
      {/* Kullanıcının bloglarına yapılan yorumların görüneceği kısım */}
      <div className='w-full flex flex-wrap justify-around p-6'>
        <CommentTemplate/>
      </div>

    </div>
  )
}

export default Profile
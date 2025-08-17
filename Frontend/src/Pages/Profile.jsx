import React from 'react'
import ProfilePhoto from '../assets/react.svg'
import Rating from '@mui/material/Rating';

function Profile() {


  // Profil kısmında gösterilen blogların bileşeni 
  const BlogTemplate = () => {
    return (
      <div className='flex w-96 p-2 rounded-2xl box-shadow cursor-pointer transition-all duration-100 hover:scale-125 m-6'>
        <div className='w-1/4'><img src={ProfilePhoto} alt='resim'className='w-full'/></div>
        <div className='w-3/4 flex flex-col items-center justify-around'>
          <p>Başlık</p>
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








  return (
    <div className='pt-13'>
      {/* Kullanıcının basit düzeyde profil bilgilerinin görüleceği kısım */}
      <div className='flex w-full'>
        <div className='w-3/12'>
          <img src={ProfilePhoto} alt='profile' className='w-full'/>
        </div>
        <div className='w-9/12 p-10'>
          <table className='w-full text-2xl'>
            <tbody>
              <tr>
                <td className='w-1/2'>ad </td>
                <td className='w-1/2'>soyad</td>
              </tr>
              <tr>
                <td className='w-1/2'>mail</td>
                <td className='w-1/2'>telefon</td>
              </tr>
              <tr>
                <td colSpan={2}>description</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* KUllanıcının yazdığı blogların görüneceği kısım */}
      <div className='w-full flex flex-wrap justify-around p-6'>
        <BlogTemplate/>
      </div>
      {/* Kullanıcının bloglarına yapılan yorumların görüneceği kısım */}
      <div className='w-full flex flex-wrap justify-around p-6'>
        <CommentTemplate/>
      </div>

    </div>
  )
}

export default Profile
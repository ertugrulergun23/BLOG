import React from 'react'
import ProfilePhoto from '../assets/react.svg'

function Profile() {
  return (
    <div className='pt-13'>
      <div className='flex'>
        <div className='w-3/12'>
          <img src={ProfilePhoto} alt='profile' className='w-full'/>
        </div>
        <div className='w-9/12'>
        
        </div>
      </div>
      <div>
         yazılan bloglar
      </div>

    </div>
  )
}

export default Profile
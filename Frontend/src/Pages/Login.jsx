import React, { useState } from 'react'

function Login() {
    const [login , setLogin] = useState(false)

    const changeLogin = () => {
        setLogin(!login)
    }
  return (
    <div className='w-full h-screen flex items-center justify-center bg-blue-500'>
        <div className='w-8/12 h-10/12 relative bg-white'>
            <div className={`h-full w-1/2 absolute z-20 transition-all duration-200 ease-in-out bg-yellow-400 ${login ? 'right-1/2' : 'right-0'}`}>
                <button onClick={changeLogin}>değiştir</button>
            </div>
            <div className='h-full w-full absolute flex z-10 bg-green-500'>
                <div className="w-1/2 flex items-center justify-center">
                    <div className='w-10/12 h-10/12 flex flex-col items-center justify-center bg-white'>
                        <h1 className='text-3xl my-5'>Giriş Yap</h1>
                        <label htmlFor='username' className='text-xl w-11/12 mb-5'>Kullanıcı Adı</label>
                        <input type='text' id='username' className='mb-5 rounded-lg p-1 text-lg w-11/12 focus:outline-0 border-2 border-black '/>
                        <label htmlFor='password' className='mb-5 text-xl w-11/12'>Şifre</label>
                        <input type='password' id='password' className=' mb-7 rounded-lg p-1 text-lg w-11/12 focus:outline-0 border-2 border-black '/>
                        <button className='w-9/12 border border-black p-1 rounded-xl text-xl bg-green-500 text-white transition-all duration-100  hover:bg-green-600'>Giriş Yap</button>
                    </div>
                </div>
                <div className="w-1/2">ikinci bölüm</div>
            </div>

        </div>
    </div>
  )
}

export default Login
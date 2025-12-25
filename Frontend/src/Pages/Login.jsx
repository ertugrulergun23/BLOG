import { Eye , EyeOff } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'



// Kullanıcıdan şifre almak için bileşen 
const PasswordTemplate = ({id,state,Setstate}) => {
    const [visibility,setVisibility] = useState(false)
    return (
        <div className='w-11/12 flex mb-5'>
            <input type={`${visibility ? 'text' : 'password'}`} id={id} className='w-11/12 rounded-bl-lg rounded-tl-lg focus:outline-0 p-1 text-lg border-l border-t border-b border-black' value={state} onChange={(e)=>Setstate(e.target.value)}/>
            <button className='w-1/12 flex items-center justify-center border-r border-t border-b border-black rounded-tr-lg rounded-br-lg' onClick={()=>{setVisibility(!visibility)}}>
                {visibility ? <Eye/> : <EyeOff/>}
            </button>
        </div>
    )
}

// Ana Fonksiyon
function Login() {
    const [login , setLogin] = useState(false) // Giriş mi yapılacak kayıt mı olunacağını belirten state
    const [rusername,Setrusername] = useState("") // Kayıt kullanıcı ismi
    const [rpassword1,Setrpassword1] = useState("") // Kayıt 1.şifre
    const [rpassword2,Setrpassword2] = useState("") // Kayıt 2.şifre
    const [lusername,Setlusername] = useState("") // Giriş kullanıcı ismi
    const [lpassword,Setlpassword] = useState("") // Giriş şifre
    const [loading,SetLoading] = useState(true) // Asenkron bekletme state'i

    const navigate = useNavigate() // Sayfa yönlendirmesi yapmamızı sağlayacak nesne 

    // Login-Register değiştirme fonksiyonu
    const changeLogin = () => {
        setLogin(!login)
    }

    // Kayıt olunma fonksiyonu
    const Registiration = async ()=>{
        await SetLoading(false)
        let data = {
            "username" : rusername,
            "password1" : rpassword1,
            "password2" : rpassword2,
        }

        const response = await fetch(
            'http://127.0.0.1:8000/api/rest-auth/registiration',
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)
            }
        )
        if(response.ok){
            const data = await response.json()
            localStorage.setItem("AuthToken",data.key)
            navigate('/complete-profile')
        }else{
            alert("Kayıt oluşurulurken bir hata oluştu")
            await SetLoading(true)
        }
    }

    // Login olma fonksiyonu
    const Login = async ()=>{
        await SetLoading(false)

        let data = {
            "username" : lusername,
            "password" : lpassword
        }

        const response = await fetch(
            'http://localhost:8000/api/rest-auth/login',
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)

            }
        )

        if(response.ok){
            const data = await response.json()
            localStorage.setItem('AuthToken',data.key)
            navigate('/')
        }else{
            alert("Yanlış kullanıcı ismi veya şifre !")
            await SetLoading(true)
        }
    }




  return (
    <div className='w-full h-screen flex items-center justify-center bg-green-500'>
        <div className='w-8/12 h-10/12 relative bg-white'>
            <div className={`h-full w-1/2 flex flex-col items-center justify-center absolute z-20 transition-all duration-200 ease-in-out bg-green-500 ${login ? 'right-1/2' : 'right-0'}`}>
                <h1 className='text-white text-3xl text-center'>
                        {login ? 'HESABIN VAR MI ?' : 'HESABIN YOK MU ?'}
                    <br/>
                        {login ? 'HEMEN GİRİŞ YAP' : 'HEMEN KAYDOL'}
                </h1>
                <button className='text-white text-3xl text-center rounded-2xl p-5 cursor-pointer box-shadow bg-blue-500 mt-10' onClick={changeLogin}>
                    {
                        login ? 'GİRİŞ YAP' : 'KAYDOL'
                    }
                </button>
            </div>
            <div className='h-full w-full absolute flex z-10'>
                <div className="w-1/2 flex items-center justify-center">
                    <div className='w-10/12 h-10/12 flex flex-col items-center justify-center bg-white'>
                        <h1 className='text-3xl my-5'>Giriş Yap</h1>
                        <label htmlFor='username' className='text-xl w-11/12 mb-5'>Kullanıcı Adı</label>
                        <input type='text' id='username' className='mb-5 rounded-lg p-1 text-lg w-11/12 focus:outline-0 border border-black ' value={lusername} onChange={(e)=>{Setlusername(e.target.value)}}/>
                        <label htmlFor='password' className='mb-5 text-xl w-11/12'>Şifre</label>
                        <PasswordTemplate id={'password'} state={lpassword} Setstate={Setlpassword}/>
                        <button className='w-9/12 border border-black p-1 rounded-xl text-xl bg-green-500 text-white transition-all duration-100  hover:bg-green-600 cursor-pointer' onClick={Login}>{loading ? 'Giriş Yap':<ProgressSpinner style={{width: '30px', height: '20px'}} strokeWidth="8"/>}</button>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className='bg-white w-10/12 h-10/12 flex flex-col items-center justify-center'>
                        <h1 className='text-3xl my-5'>Kayıt Ol</h1>
                        <label className='text-xl w-11/12' htmlFor="susername">Kullanıcı Adı</label>
                        <input type='text' id='susername' className='border border-black w-11/12 rounded-lg p-1 text-lg focus:outline-0 mb-5' value={rusername} onChange={(e)=>Setrusername(e.target.value)}/>
                        <label className='text-xl w-11/12' htmlFor="spassword1">Şifre</label>
                        <PasswordTemplate id={'spassword1'} state={rpassword1} Setstate={Setrpassword1}/>
                        <label className='text-xl w-11/12' htmlFor="spassword2">Şifre Tekrar</label>
                        <PasswordTemplate id={'spassword2'} state={rpassword2} Setstate={Setrpassword2}/>
                        <button className='w-9/12 p-1 text-xl transition-all duration-100 border border-black bg-green-400 text-white cursor-pointer rounded-xl hover:bg-green-500' onClick={Registiration}>{loading ? 'Kayıt Ol':<ProgressSpinner style={{width: '30px', height: '20px'}} strokeWidth="8"/>}</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login
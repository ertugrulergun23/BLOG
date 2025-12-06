import React, { useEffect, useRef, useState } from 'react'
import Rating from '@mui/material/Rating';
import gsap from 'gsap';
import { useParams } from 'react-router-dom';
import { GetBlogById,PostComment,GetComment } from '../Context/UseAuthApi';
import { ProgressSpinner } from 'primereact/progressspinner';



// Yorum Ekleme bileşeni
function AddCommentTemplate({blog}){
    const [commentContext,SetCommentContext] = useState('') //Eklenmek istenen yorumun içeriğini tutacak state
    const [point,SetPoint] = useState(null) //Eklenmek istenen yorumdaki puanı tutacak state
    const [situation,SetSituation] = useState(false)

    useEffect(()=>{
        if(blog.author!=localStorage.getItem('Username')){
            SetSituation(true)
        }
    },{})

    const handleSendComment = async ()=>{
        const bodyData={
            'blog':blog.id,
            'content':commentContext,
            'point':point
        }
        await PostComment(bodyData)
        await SetPoint(null)
        await SetCommentContext('')
    }

    return (
        <div>
            {
            !situation ? <div></div>:
            <div className='w-full my-10 flex flex-col items-center justify-center'>
                <hr className='w-11/12 mb-6 border border-black'/>
                <h3 className='text-3xl mb-10'>YORUM EKLE</h3>
                <div>
                    <Rating size={'large'} className="mb-6" value={point} onChange={(e)=>{SetPoint(parseFloat(e.target.value))}}/>
                </div>
                <div className='w-8/12 bg-white flex items-center justify-center p-1'>
                    <textarea placeholder='Yorumunu buraya yaz...' style={{resize:"none"}} name="commentinput" className='w-10/12 rounded focus:outline-0 p-2 text-xl box-shadow' value={commentContext} onChange={(e)=>{SetCommentContext(e.target.value)}}></textarea>
                </div>
                <button className='box-shadow text-white bg-green-500 px-4 py-3 rounded cursor-pointer active:bg-green-600 m-5' onClick={handleSendComment}>Gönder</button>
            </div>
            }
        </div>
    )
}









function BlogDetail() {

    const [blog,SetBlog] = useState()//Blogu tutacak state
    const [comments,SetComments] = useState() //Blogun yorumlarını tutacak state
    const [loading,SetLoading] = useState(false)//API'dan cevap gelene kadar bekletecek state


    const {id} = useParams()//Url'den gelen parametreyi alacak state

    // API istek atıp responsu tutacak state
    useEffect(()=>{
        const GetBlog = async ()=>{
            const response = await GetBlogById(id)
            await SetBlog(response)
            const commentsResponse = await GetComment(id)
            await SetComments(commentsResponse)
            await SetLoading(true)
        }
        GetBlog()
        console.log(blog)
    },[])






    const commentsRef = useRef([]) // render edilen yorumları almak için ref state'i
    // Sayfa tekrar render edildiğinde eski refleri silmemize yarayacak olan fonksiyon 
    useEffect(()=>{
        commentsRef.current = []
    },[])

    // Yorumları commentsRef'e ekleyecek fonksiyon 
    const AddRef = (el) => {
        if( el && !commentsRef.current.includes(el)){
            commentsRef.current.push(el)
        }
    }

    useEffect(()=>{
        if(commentsRef.current.length > 0){
            gsap.fromTo(
                commentsRef.current,
                {
                    y:200,
                    opacity:0
                },
                {
                    y:0,
                    opacity:1,
                    duration:1.5,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.2

                }
            )
        }
    },[])


    // Yorum bileşeninde profil kısmında profile ulaşmak için bir menü yapılabilir 
    // Yorum bileşenine yorumu beğenme gibi özellikler de eklenecek 
    // Blog için yazılan yorumları gösterecek olan bileşen
    const Comment = ({data,index}) =>{
        return (
            <div className='w-full flex' ref={AddRef}>
                {
                    index%2==1 ? <div className='w-7/12'></div> : null
                }
                <div className='w-5/12 p-2 rounded-xl box-shadow flex flex-col items-center'>
                    <div className='w-full flex pb-1 items-center'>
                        <div className='w-10 h-10 rounded-[50%] me-4'>
                            <img src={data.avatar} className='h-full rounded-xl'/>
                        </div>
                        <div>{data.author}</div>
                        <div></div>
                    </div>
                    <hr className='w-full bg-gray-500'></hr>
                    <div className='w-full flex flex-col'>
                        <div><Rating name="half-rating-read" defaultValue={data.point} precision={0.5} readOnly /></div>
                        <p className=''>{data.content}</p>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className='w-full pt-13 flex items-center justify-center'>
        {!loading ? <ProgressSpinner/>:
            <div className='w-full pt-13 flex flex-col items-center'>
                {/* Blog başlığı */}
                <div className='w-11/12 flex flex-col items-center justify-center mt-10'>
                    <h2 className='text-5xl'>{blog.tittle}</h2>
                    <hr className='w-full mt-6'></hr>
                </div>
                {/* Blog resim ve içeriği */}
                <div className='w-11/12 mt-4'>
                    <div className='w-4/12 float-right '>
                        <img src={blog.image} alt='resim' className='w-full'/>
                    </div>
                    <p className='text-2xl'>
                        {blog.content}
                    </p>
                </div>

                <hr className='w-11/12 my-4'></hr>
                {/* Örnek yorumlar */}
                <div className='w-11/12'>
                    {
                        comments.map((data,i)=>{
                            return (
                                <Comment data={data} key={i} index={i}/>
                            )
                        })
                    }
                </div>
                {/* Yorum ekleme bileşeni */}
                <AddCommentTemplate blog={blog}/>
            </div>
        }
    </div>
  )
}

export default BlogDetail
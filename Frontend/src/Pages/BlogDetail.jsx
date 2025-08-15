import React, { useEffect, useRef, useState } from 'react'
import ExampleFoto from '../assets/react.svg'
import Rating from '@mui/material/Rating';
import gsap from 'gsap';

function BlogDetail() {
    const commentsRef = useRef([]) // render edilen yorumları almak için ref state'i
    const [datas,setDatas] = useState([
        {
            text:"example_text_1",
            point:3,
        },
        {
            text:"example_text_2",
            point:4.5,
        },
        {
            text:"example_text_1",
            point:3,
        },
        {
            text:"example_text_2",
            point:4.5,
        },
    ])

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
    const Comment = ({text,puan,index}) =>{
        return (
            <div className='w-full flex' ref={AddRef}>
                {
                    index%2==1 ? <div className='w-7/12'></div> : null
                }
                <div className='w-5/12 p-2 rounded-xl box-shadow flex flex-col items-center'>
                    <div className='w-full flex pb-1 items-center'>
                        <div className='w-10 h-10 rounded-[50%] me-4'>
                            <img src={ExampleFoto} className='h-full'/>
                        </div>
                        <div>Profile Name</div>
                        <div></div>
                    </div>
                    <hr className='w-full bg-gray-500'></hr>
                    <div className='w-full flex flex-col'>
                        <div><Rating name="half-rating-read" defaultValue={puan} precision={0.5} readOnly /></div>
                        <p className=''>{text}</p>
                    </div>
                </div>
            </div>
        )
    }





  return (
    <div className='w-full pt-13 flex flex-col items-center'>

        <div className='w-11/12 flex flex-col items-center justify-center mt-10'>
            <h2 className='text-5xl'>BAŞLIK</h2>
            <hr className='w-full mt-6'></hr>
        </div>

        <div className='w-11/12 mt-4'>
            <div className='w-4/12 float-right '>
                <img src={ExampleFoto} alt='resim' className='w-full'/>
            </div>
            <p className='text-2xl'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora asperiores in hic dolorum accusantium facere aperiam porro, cum eos recusandae quo consequatur, officiis voluptatem adipisci labore reiciendis velit sapiente! Excepturi ipsa voluptatibus a perferendis quibusdam tempore sequi fugit nemo numquam dicta. Architecto ad laboriosam dolorum nisi soluta sequi fugit ullam provident maxime magnam, eos quam a. Sit asperiores ut autem debitis recusandae hic. Mollitia nam rerum nemo facilis at. Enim voluptate delectus vel magni voluptatem impedit sint nam tempora velit doloribus, nisi in, modi eligendi neque numquam pariatur ipsam placeat tenetur, amet repellat odit at omnis! Minus mollitia dicta exercitationem rem perferendis, unde aspernatur incidunt ratione? Laboriosam ipsam modi perferendis pariatur animi, corrupti ducimus error molestiae quasi deserunt nemo ipsum beatae reprehenderit rem dolores repellat eos iure aliquam autem repellendus officiis et dolorem! Eos perspiciatis veritatis dolor sequi rerum culpa corporis libero repellat. Excepturi placeat exercitationem cupiditate dolores id! Sit magnam fuga, reprehenderit adipisci ad atque soluta tempore dolores vitae officiis magni debitis, qui incidunt minus. Provident quas earum molestias vitae cupiditate nemo eveniet, fugiat aliquid exercitationem nisi eius commodi. Eligendi totam molestias nihil expedita deleniti impedit placeat ab voluptates reprehenderit? Alias provident, natus voluptatem quibusdam veniam, vel sunt exercitationem, nobis necessitatibus temporibus assumenda vero impedit quia. Ipsam at doloremque numquam, quam reiciendis nostrum, eveniet distinctio in, sed nesciunt ullam illo accusantium magni praesentium provident voluptatibus? Repellendus ipsum a itaque sed sint cumque ipsa esse reiciendis omnis in voluptatum, accusamus magnam? Magni praesentium iusto eos amet adipisci repellendus eum ex explicabo harum ad pariatur ullam repellat in, dolor, officia impedit quasi ipsum ipsam molestiae, culpa placeat tempora voluptas! Consequatur explicabo voluptatem repudiandae, minima consequuntur dicta laborum quam expedita, repellat non ipsam praesentium. Voluptate quae illo nihil, non facilis fugit dolore, sapiente enim autem, natus repellendus dolorem quaerat deleniti ipsam at debitis aliquid dolores. Unde ducimus asperiores, quam corporis ipsa provident porro enim nisi sit inventore omnis maxime rerum eveniet amet libero accusantium cupiditate perferendis laboriosam reiciendis, in sapiente dolore soluta est architecto! Eum vero voluptatibus quas facere accusantium ipsam aliquid consequuntur iste obcaecati, tempore sapiente quam officiis qui, dolorum placeat vitae nihil, soluta autem quae vel nisi. Exercitationem enim sint quibusdam velit cupiditate similique, minima aliquid ipsam blanditiis quae est neque laboriosam in. Laborum dolores veniam quis, error suscipit totam, fugiat excepturi eius molestiae laudantium quibusdam. Natus similique ipsa consequuntur suscipit quos ullam itaque blanditiis, ea modi, optio laborum debitis praesentium distinctio eaque laudantium est facere labore aliquid rem autem? Beatae consequatur, totam debitis doloribus praesentium hic voluptas necessitatibus illum cum vitae! Sapiente ipsum dolore quia doloremque quisquam laudantium non. Deleniti accusamus esse, odit illo dolores rerum maiores sit sapiente asperiores, aliquid numquam amet aperiam explicabo accusantium suscipit, tempore quam distinctio a. Laudantium, obcaecati officia. Repellendus, ea! Dolore quaerat sint temporibus laborum, consectetur facilis dicta sed veniam repellat neque ipsa nobis minus sunt quod velit magnam expedita dolorem explicabo placeat odio. Ut alias nemo, aliquid maxime fugit ex, atque at numquam omnis voluptatum suscipit vitae corrupti animi consectetur iusto sequi?
            </p>
        </div>

        <hr className='w-11/12 my-4'></hr>

        <div className='w-11/12'>
            {
                datas.map((data,i)=>{
                    return (
                        <Comment text={data.text} puan={data.point} key={i} index={i}/>
                    )
                })
            }
        </div>

    </div>
  )
}

export default BlogDetail
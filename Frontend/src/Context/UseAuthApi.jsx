// Api'ya yapılacak istek fonksiyonları 

// Kullanıcı profilini getiren fonksiyon
export const GetUser = async ()=>{
  const token = localStorage.getItem('AuthToken');

  if(token){
    const response = await fetch('http://localhost:8000/api/profiles/me/',{
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${localStorage.getItem('AuthToken')}`
      }
    })
    const profile=await response.json()
    console.log(typeof(profile.id))
    return profile;
  }
  else{
    return null;
  }
}

//Siteye ilk girildiğinde çalışacak ve gerekli ayarlamaları yapacak fonksiyon
export const StartProtocol = async ()=>{
  const token = localStorage.getItem('AuthToken')
  const username = localStorage.getItem('Username')
  if(!username){
    if(token){
      const response=await fetch('http://localhost:8000/api/profiles/me/',{
        method:'GET',
        headers:{
          'Content-Type':'Application/json',
          'Authorization':`Token ${token}`
        }
      })
      if(!response.ok){
        throw new Error("Bir sorun oluştu !")
      }
      const userData = await response.json()
      localStorage.setItem('Username',userData.user.username)
    }
  }
}

// Kullanıcının Bloglarını getirecek fonksiyon
export const GetUserBlogs = async () =>{
    const token = localStorage.getItem('AuthToken');

  if(token){
    const response = await fetch('http://localhost:8000/api/profiles/me/blogs/',{
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`
      }
    })
    const blogs=await response.json()
    console.log(blogs)
    return blogs;
  }
  else{
    return null;
  }
}

// Blog id'ye göre blog getirecek fonksiyon 
export const GetBlogById = async (pk)=>{
  const token = localStorage.getItem('AuthToken');

  if(token){
    const response = await fetch(`http://localhost:8000/api/blogs/${pk}/`,{
      method:'GET',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`
      }
    })
    const blog = await response.json()
    return blog
  }
}

// Yorum oluşturma API'sine istek atacak fonksiyon
export const PostComment = async (bodyData)=>{
  const token = localStorage.getItem('AuthToken')
  
  if(token){
    const response = await fetch('http://localhost:8000/api/comments/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Token ${token}`
      },
      body:JSON.stringify(bodyData)
    })
    return response
  }
}

//Belirlenen bloğun yorumlarını getirecek fonksiyon 
export const GetComment = async (id)=>{
  const response = await fetch(`http://localhost:8000/api/blogs/${id}/comments`)
  const comments = await response.json()
  return comments
}
import './App.css';
import React,{useState,useEffect} from 'react';
import Post from './Post';
import {db} from "./firebase"

function App() {
  //let data=["ali","veli","ahmet","mert","cezmiye"]
  /* POSTS kulalnıcıların bilgileri icerecek */
  const[posts,setPosts]=useState([
    {
    kullanıcıadı:"Kamil",
    caption:"Bu baya iyi gibi ne dersin",
    fotourl:"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600",
    id:0
    },
    {
      kullanıcıadı:"Mert",
      caption:"Merak etme şimdilik",
      fotourl:"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600",
      id:1
      },
      {
        kullanıcıadı:"Ali",
        caption:"Devam ediyoruz yollardayız yine",
        fotourl:"https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&w=600",
        id:2
        }

])
//&FİRABASE ALANI ICIN USEFFECT İLE BAŞLADI KOD YAZMAYA BURASI BAŞLANGICİ//
useEffect(()=>{
  //onsnapshat her bir parça degisse bile güncelliyor veriyi
 db.collection('posts').onSnapshot(snapshot=>{
  setPosts(snapshot.docs.map(doc=>doc.data()))
 })
//^ bu docs firabse deki add document altındaki tüm posts ları tek tek gezmek yani 3 obje iceriyor ya  o objeleri geziyoruz.

},[])// ilk ekran yuklemede bir kere calısacak useffect ayrıca posts her  güncellendiginde degistiginde calısacak!

  return (
    

<div className="app">
<div className='app__header'>
<img className='app__headerImage' src='https://seeklogo.com/images/I/instagram-logo-B12DD504FE-seeklogo.com.png'alt='solüstlogo'/>
</div>
{/* Return içinde js normalde yazamaıyorusun koşeli parantez koyarak yazabilrsin*/}


{/*
<Post kullanıcıadı={"Kamil"} caption="Bu baya iyi gibi ne dersin" fotourl={'https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png'}/>
<Post kullanıcıadı={"Mert"} caption="Devam etmelisin" fotourl={'https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png'}/>
*/}
<h1>Merhaba UYGULAMA BAŞLIK KISMI</h1>
{
  /*Map kullanma sebebi foreach return yapamıyor bir değer ekrana basamıyor map da return var */
posts.map(post=>{

return <Post kullanıcıadı={post.kullanıcıadı} caption={post.caption} fotourl={post.fotourl} key={post.id}/>


})
}

{/*<Post kullanıcıadı={posts[0].kullanıcıadı} caption={posts[0].caption} fotourl={posts[0].fotourl}/>*/}

</div>

   
  );
}

export default App;

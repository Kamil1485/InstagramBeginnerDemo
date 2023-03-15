/*FOTOLARIN OLDUGU KISIM KİŞİLERİN PAYLAŞTIGI BUYUK */
//ADIM2
import React from 'react'
/*avatar kucuk foto soldaki  kullanıcının paylasıtıgı büyük üstündeki kücük*/
import Avatar from 'react-avatar';
function Post({kullanıcıadı,caption,fotourl}){
 
  return ( 
  
<div className='post'>

<div className='post__header'>
<div>
<img className='post__avatarImage' src="https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png" alt=""/>
</div>
<div className='post__avatar' alt={kullanıcıadı}>{kullanıcıadı}</div>
</div>


{/*Header ,avatar ve kullanıcı adı kısmı */}

<img className='post__image' src={fotourl}/>
{/*FOTO */}

<h4 className='post__text'><strong>{kullanıcıadı}</strong> {caption}</h4>

{/* kullanıcıadı ve foto altında bunlar foto altı kısmı*/}
    </div>
  )
}

export default Post
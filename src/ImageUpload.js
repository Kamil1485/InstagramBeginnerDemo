import React from 'react'
import { useState } from 'react'
import {storage,db} from "./firebase"
import firebase from 'firebase/compat/app';
function ImageUpload({kullanıcıadı}) {
//caption:altyazı kullanıcının foto altına yazdıgı kısm
const [altyazı,setAltyazı]=useState("");
const[url,setUrl]=useState("")
const [foto,setFoto]=useState(null);
const [progressbar,setProgressbar]=useState(0);

//3.adım da kullanıcı kayıt olunca veriler nereye gidiyor firebase de depolanıyormu? 
/*
/*bana lazım olanlar */
/*File picker */
/*Post Button */
//ADIM 4 FOTO VE BİLGİLERİ DATABASE E YÜKLEME KULLANICININ YÜKLEMEK İSTEDİĞİ
//adım 4 ile imageUpload.js olusturmaya başla

function handleChange(e) { 
if(e.target.files[0]){ //dosya seciminde toplu secim yapıp enterlarsa ilk secilen dosyayı alıyoruz kıstas  yani
    setFoto(e.target.files[0])
}
 }
 const handleUpload = () => {
    const uploadTask = storage.ref(`images/${foto.name}`).put(foto);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressbar(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage //bu kısmın amacı ise:fotolarımızı ve foto ismini depolamak fotoyu fark ettiyseniz firebase e göndermiyoruz! url gönderiyoruz ama fotonun kendisini değil.
          .ref("images")
          .child(foto.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside db
            //^Asıl firebase e ekleme kısmı burası!
            db.collection("posts").add({ //database e gönderiyoruz bilgileri posts lara eklenecek bunlar add ile ekleniyor database e peki çekme=
              fotourl: url,
              caption: altyazı,
              kullanıcıadı: kullanıcıadı,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgressbar(0);
            setAltyazı("");
            setFoto(null);
          });
      }
    );
  };
  return (//her tuşa bastıgında  altyazı yı güncelleyecegiz girilen değer ile. anında!
  <div>
  <progress className="imageupload__progress" value={progressbar} max="100" />
     <input type="text"  placeholder="Enter Subtitle" onChange={(event)=>{setAltyazı(event.target.value)}} value={altyazı}></input> 
    <input type="file" onChange={handleChange}></input>
    <button className='imageupload__button' onClick={handleUpload}>Yükle</button>
    </div>
  )
}

export default ImageUpload
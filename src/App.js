import "./App.css";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import { auth, db } from "./firebase";
//3.adım
import { makeStyles } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function App() {
  const SıgnUpModal = document.querySelector(".Modal__signUp");
  const SıgnInModal = document.querySelector(".Modal__signIn");
  console.log(SıgnUpModal);
  console.log(SıgnInModal);
  const [openSignIn, setOpenSignIn] = useState(false); //! 3.5
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kullanıcıadı, setKullanıcıadı] = useState(""); //kullanıcıadı user.displayname aslında!
  const [user, setUser] = useState(null);
  const [openmodal, setOpenmodal] = useState(false); //SUAN KULLANMIYORUM BUNU
  //^3.3
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //backend listener olarak düsün normalde useffect de listener kullanamaması lazım, bu backend de değişiklik yapıyor, useffect frontendte!
      //console.log("2.calısacagım unsubscribe içi")
      if (authUser) {
        //kullanıcı logged in
        console.log(authUser); //KULLANICI GİRİNCE CONSOLE YAZDIR LOGGED İN
        setUser(authUser);
        if (authUser.displayName) {
          //eğer kullanıcı-adı varsa alınmışssa, güncelleme
        } else {
          //yeni bir kullanıcı isimli biri yaratıyorsak
          //daha önceden o kullanıcı adlı birisi yoksa güncelliyoruz adını
          return authUser.updateProfile({
            displayName: kullanıcıadı,
          });
        }
      } else {
        setUser(null);
        //kullancı logged out
      }
    });
    //console.log("1.çalışacagım");
    return () => {
      //perform some cleanup actions!
      unsubscribe();
    };
  }, [user, kullanıcıadı]);

  // getModalStyle is not a pure function, we roll the style only on the first render

  //let data=["ali","veli","ahmet","mert","cezmiye"]
  /* POSTS kulalnıcıların bilgileri icerecek */
  const [posts, setPosts] = useState([]);
  //&FİRABASE ALANI ICIN USEFFECT İLE BAŞLADI KOD YAZMAYA BURASI BAŞLANGICİ//
  useEffect(() => {
    //KOD burada calısacak
    //^useffect icine yazma amcımız sayfa ilk yüklenirken bu kısım banko calısacak onun icin ilk yüklemede databasede kayıtlı tüm kişileri ekrana yazmamız lazım
    //orderby metodu aslında database de sıralıyor ornekteki azlan şekilde databasede yukarıdan assagı en son yüklenendne en az yüklene sıralıyor e tek tek alırken en üstteki en son yüklenen olacagından ilke yerleşmiş oluyor.
    //onsnapshat her bir parça degisse bile güncelliyor veriyi
    // uniqe key hata vermesin diye bu id alttaki id yi ulasıyoruz bu sekilde her  verimizin id si oluyor
    /* 2gSdlfAX963Y7qdQ4 */
    //4.ADIM DEVAM ORDERBY İLE  dosya sec ip foto altyazıyla paylaşınca rasgele ekleniyor sayfasına kullanıcını once eklenen altta en son eklenen üstte olmalı
    //timestamp bir özellik kullanıcıadı gibi biz tanımladık ona gore sıralama yapma group by gibi azalan sırada en son eklenen en üste gelmesi için
    //ANLIK VERİ DEĞİŞİR DEĞİŞMEZ GÜNCELLER onSnaphsot bizde güncelleneni hemen setposts umdaki degerine aktarırız
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id, //^id key olarak kullanacagız PEKİ AMACI NE:her posts yüklenirken sayfayı refreslemesin diye
            post: doc.data(),
            //YAPTIGIMIZ ÖZET:DATABASEDEN VERİYİ AL Posts un icine at id burada databasedeki id si otoıd olustur diyorsun kaydederken oradan,uygulama icinden kayıt olmada daha sonra posts u map ile elemanlarına gezerek  kullanıcıadı,fotourl,caption verisini al
            //* posts:{{...},{...},{...},{...}} iceriyor!!!!!
          }))
        );
      });

    //^ bu docs firabse deki add document altındaki tüm posts ları tek tek gezmek yani 3 veri iceriyor ya  o nesneleri geziyoruz.
  }, []); // ilk ekran yuklemede bir kere calısacak useffect ayrıca posts her  güncellendiginde degistiginde calısacak!

  //^3.2
  const signUp = (e) => {
    e.preventDefault();

    //SİGNUP kısmı
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: kullanıcıadı,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }; //hata olursa uyarı mesajı göstermek için

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  return (
    //^ 4.  postsları ve  fotoları firebase e aktaracagız kullanıcının yükleyeceği*/

    //<button type='submit' className='SignUp' onClick={signUp}>SignUp</button>
    //& 3.4.1
    //^3.1

    <div className="app">
      {user?.displayName ? (
        <ImageUpload kullanıcıadı={user.displayName} />
      ) : (
        <h2>Sorry You must be logged in to Upload</h2>
      )}

      <div className="Modal__signUp hide">
        <form className="app__signup">
          <img
            width={"42px"}
            src="https://seeklogo.com/images/I/instagram-new-2016-logo-D9D42A0AD4-seeklogo.com.png"
            alt="kucuklogo"
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Username"
            value={kullanıcıadı}
            onChange={(e) => setKullanıcıadı(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          {
            //& 3.4.2
            user ? (
              <button
                type="submit"
                className="SignOut"
                onClick={() => {
                  auth.signOut();
                }}
              >
                LogOut
              </button>
            ) : (
              <div className="app_loginContainer">
                <button type="submit" className="SignUp" onClick={signUp}>
                  SignUp
                </button>
              </div>
            )
          }
        </form>
      </div>
      
      <div className="giris">
        <h1>Sign Up or Sign In to use app</h1>

        <button style={{marginTop:"15px"}}
          type="submit"
          className="SignUp"
          onClick={() => {
            SıgnInModal.classList.add("hide");
            SıgnUpModal.classList.add("hide");
            SıgnUpModal.classList.remove("hide");
          }}
        >
          SignUp
        </button>
        <br />

        <button
         style={{marginTop:"15px"}}
          type="submit"
          className="SignUp"
          onClick={() => {
            SıgnUpModal.classList.add("hide");
            SıgnUpModal.classList.add("hide");
            SıgnInModal.classList.remove("hide");
          }}
        >
          SıgnIn
        </button>
      </div>

      <div className="Modal__signIn hide">
        <form className="app__signIn">
          <img
            width={"42px"}
            src="https://seeklogo.com/images/I/instagram-new-2016-logo-D9D42A0AD4-seeklogo.com.png"
            alt="kucuklogo"
          />{" "}
          <br />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          {
            //& 3.4.2
            //Bu kısım kullanıcı varsa buton logout yazacak yani ilk başta sigup yazacak girecek sonra logout yazacak cıkacak signup oalcak tekrar girmek için
            user ? (
              <button
                type="submit"
                className="SıgnIn"
                onClick={() => {
                  auth.signOut();
                }}
              >
                LogOut
              </button>
            ) : (
              <button type="submit" className="SıgnIn" onClick={signIn}>
                SıgnIn
              </button>
            )
          }
        </form>
      </div>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://seeklogo.com/images/I/instagram-logo-B12DD504FE-seeklogo.com.png"
          alt="solüstlogo"
        />
      </div> 

      {/*
<Post kullanıcıadı={"Kamil"} caption="Bu baya iyi gibi ne dersin" fotourl={'https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png'}/>
<Post kullanıcıadı={"Mert"} caption="Devam etmelisin" fotourl={'https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png'}/>
*/}

      <h1 style={{color:"orange",fontSize:"2.1rem"}}>Instagram Demo</h1>
      {
        posts.map(({ id, post }) => {
          return (
            <Post
              key={id}
              kullanıcıadı={post.kullanıcıadı}
              caption={post.caption}
              fotourl={post.fotourl}
            />
          );
        })
      }

      {/*<Post kullanıcıadı={posts[0].kullanıcıadı} caption={posts[0].caption} fotourl={posts[0].fotourl}/>*/}
    </div>
  );
}

export default App;

//1.adım post.js olusturma
//2.adım database kaydettigin veriyi alma
//3.adım user authentication yani login sign-in  olma kısmı
//materialuı install et npm

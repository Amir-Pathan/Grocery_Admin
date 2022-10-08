import {db,storage} from "../firebase";
import {collection,getDocs,where,query,addDoc,doc,getFirestore,getDoc, onSnapshot, Firestore} from 'firebase/firestore'
import { async } from "@firebase/util";
import { formControlLabelClasses } from "@mui/material";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'


const services ={

    createAccount:async(dc)=>{


        const q = query(collection(db, "sellers"), where("no","==",dc.no));

        const docs=await getDocs(q)

        if(docs.docs.length===0){

              addDoc(collection(db,'sellers'),dc).then(async(docRef)=>{



             const re = doc(db,'sellers',docRef.id)

             onSnapshot(re,(doc)=>{

              let us = doc.data()

              us.id=doc.id

              localStorage.setItem('seller',JSON.stringify(us))

              window.location.pathname='/'

             })
  
              }).catch((err)=>{
                alert('somethin wrong try again')
              })

        }else{

            alert('No email available please login')

        }


    },

    login : async(no,password)=>{

      const q = query(collection(db, "sellers"), where("no", "==", no));

      const querySnapshot = await getDocs(q);

      console.log(querySnapshot.docs.length);


      if(querySnapshot.docs.length>0){

        querySnapshot.forEach((doc) => {

              
          // doc.data() is never undefined for query doc snapshots
          const user = doc.data()

          if(user.password===password){

            console.log('login');

            user.id=doc.id

            localStorage.setItem('seller',JSON.stringify(user))

            window.location.pathname='/'

            console.log(user);

          }else{

            alert('invalid password');

          }
  
        });
        

      }else{

        alert('User no Not found')

      }


    },

    autentication:()=>{

      let loggedIn=false

      let slr = localStorage.getItem('seller')

      return new Promise(async(resolve,reject)=>{

        if(slr!==null){

          slr=JSON.parse(slr)||{}

          if(Object(slr)){

            if(slr.id){

              const docRef = doc(db,'sellers',slr.id);
               const docSnap = await getDoc(docRef);

             if (docSnap.exists()) {
            let docData = docSnap.data();

            console.log(docData);
            
               resolve(true)

              } else {
                localStorage.removeItem('seller')
              reject(false)
              }

            }else{

              reject(false)

            }

          }else{

            reject(false)

          }


        }else{
          reject(false)
        }


    })


    },

    uploadImage:(img)=>{

      return new Promise((resolve,reject)=>{

        if(img===null){

          reject('select file')

        }

        const storageRef = ref(storage,'/files/'+img.name)

        const uploadTask = uploadBytesResumable(storageRef, img);
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
   
          },
          (err) => reject(err),
          () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  resolve(url)
              });
          }
      ); 

      })

    }

}

export default services
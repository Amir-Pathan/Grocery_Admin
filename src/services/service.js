import {db,storage} from "../firebase";
import {collection,getDocs,where,query,addDoc,doc,getFirestore,getDoc, onSnapshot, Firestore, setDoc, updateDoc} from 'firebase/firestore'
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

    },

    addData:(colc,data)=>{

      return new Promise((resolve,reject)=>{

        addDoc(collection(db,colc),data).then((res)=>{

          resolve(true)

        }).catch((err)=>{

          reject(false)

        })

      })

    },

    updateData:(colc,id,dc)=>{

      return new Promise((resolve,reject)=>{

        const docRef = doc(db,colc,id)

        updateDoc(docRef,dc).then((res)=>{

          console.log(res);
          resolve(res)

        }).catch((err)=>{
          console.log(err);
          reject(err)
        })

      })

    },

    getData:async(colc,usertype,id,no)=>{

      console.log(no);

      return new Promise((resolove,reject)=>{


        let response

        if(colc==='categories'){

          response = query(collection(db,colc))
        }else{

          if(no==='7741943487'){
            response = query(collection(db,colc))
          }else{
            response = query(collection(db, colc), where(usertype ,"==",id))
          }

        }


          getDocs(response).then((res)=>{
            
            const categorie=[]


            res.forEach((res)=>{

              let alldata = res.data()
              
              alldata.id=res.id

              categorie.push(alldata)

            })

            resolove(categorie)

          }).catch((err)=>{
            reject(err)
          })

      })

    },

    getSingleData:(id,colc)=>{

      console.log(colc,id);

      return new Promise((resolve,reject)=>{

        const dc = doc(db,colc,id)

        getDoc(dc).then((res)=>{

          let allData = res.data()

          allData.id=res.id

          resolve(allData)

        }).catch((err)=>{
          reject(err)
        })

      })

    },

    getSeller:()=>{

      let sellr = localStorage.getItem('seller')

      sellr= JSON.parse(sellr)||{}

      return sellr

    }

}

export default services
import logo from './logo.svg';
import './App.css';
import routes from './routes';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import services from './services';
import { useEffect, useState } from 'react';

function App() {

  useEffect(()=>{

    let path = window.location.pathname

    services.autentication().then((res)=>{
  
      if(path==='/createAccount'||path==='/login'){

        window.location.pathname='/'

      }
 
    }).catch((err)=>{


      if(path!=='/createAccount'){

        if(path==='/login'){
          return
        }else{

          window.location.pathname='/createAccount'

        }

      }

    })

  },[])

  const [img,setImgUrl] = useState('')
  
  const upload =(e)=>{

       services.uploadImage(e.target.files[0]).then((res)=>{

        console.log(res);

       }).catch((err)=>{

        console.log(err);

       })

  }


  return (
    <Router>

        <input type='file' value={img} onChange={upload}/>

      <Routes>
        {
          routes.map((i,index)=>{

            return <Route path={i.path} key={index} element={i.componet} />

          })
        }
      </Routes>
    </Router>
  );
}

export default App;

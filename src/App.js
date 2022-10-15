import logo from './logo.svg';
import './App.css';
import routes from './routes';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import services from './services';
import { useEffect, useState } from 'react';
import store from './redux/store';
import {Provider} from 'react-redux'
import AppBarr from './appbar';


function App() {

  const [loggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{

    let path = window.location.pathname

    services.autentication().then((res)=>{
  
      setLoggedIn(true)

      if(path==='/createAccount'||path==='/login'){

        window.location.pathname='/'

      }
 
    }).catch((err)=>{

         setLoggedIn(false)
      if(path!=='/createAccount'){

        if(path==='/login'){
          return
        }else{

          window.location.pathname='/createAccount'

        }

      }

    })

  },[])


  return (
    <Provider store={store}>
    <Router>

      {
        loggedIn?
        <AppBarr/>:
        null
      }

      <Routes>
        {
          routes.map((i,index)=>{

            return <Route path={i.path} key={index} element={i.componet} />

          })
        }
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;

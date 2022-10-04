import logo from './logo.svg';
import './App.css';
import db from './firebase';
import {addDoc,collection} from 'firebase/firestore'

function App() {


  const submit=()=>{

     addDoc(collection(db,'list'),{
      name:'Amir',
      age:18
     }).then((res)=>{

        console.log(res);

     }).catch((err)=>{
      console.log(err);
     })

  }

  return (
    <div className="App">
      <button 
      onClick={submit}
      >add</button>
    </div>
  );
}

export default App;

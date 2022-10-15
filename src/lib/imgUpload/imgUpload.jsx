import { Button } from '@mui/material'
import React,{useRef} from 'react'
import services from '../../services'


function UploadIamge({title,k,handleChange,val}){

    const refer= useRef(null)

    const handleRef=()=>{
        console.log('ref');
        refer.current.click()
    }

    const handleImg=(e)=>{

       services.uploadImage(e.target.files[0]).then((res)=>{

        handleChange(k,res)

       }).catch((err)=>{

        console.log(err);

       })

    }

    return(
        <>
        <input type="file" accept='image/*'
        ref={refer}
        style={{display:'none'}}
        onChange={handleImg}
        />
        <Button 
        onClick={handleRef}
        >Upload {title} Image</Button>
        </>
    )

}

export default UploadIamge
import { Grid,Divider } from "@mui/material";
import React,{useEffect} from "react";
import { useState } from "react";
import services from "../services";

const style ={
    center:{
        textAlign:'center'
    }
}

function Users({user}){

    const [userr,setUser] = useState([])

    const heads = ['Name','Hotel Name','Address','No']

    const users=()=>{

        console.log(user);

         services.getData(user).then((res)=>{
            setUser(res)
         }).catch((err)=>{
            console.log(err);
         })

    }


    useEffect(()=>{

        users()

    },[])

    return(

        <>
        <Grid container item xs={12} md={12}>
            <Grid container item xs={12} md={12} style={{color:'white',backgroundColor:'black'}}>
                {
                    heads.map((i,index)=>{
                        return <Grid item xs={3} md={3} key={index}>
                            <h5 style={style.center}>{i}</h5>
                        </Grid>
                    })
                }
            </Grid>
            <Divider/>
            <Grid container item xs={12} md={12}>
                {
                    userr.length>0?
                    userr.map((i,index)=>{
                        return <Grid container item xs={12} md={12} key={index} style={{cursor:'pointer'}}>
                            <Grid item xs={3} md={3}>
                            <h5 style={style.center}>{i.name}</h5>
                            </Grid>
                            <Grid item xs={3} md={3}>
                            <h5 style={style.center}>{i.hotelName}</h5>    
                            </Grid>
                            <Grid item xs={3} md={3}>
                            <h5 style={style.center}>{i.address}</h5>    
                            </Grid>
                            <Grid item xs={3} md={3}>
                            <h5 style={style.center}>{i.no}</h5>    
                            </Grid>
                        </Grid>
                    })
                    :null
                }
            </Grid>
        </Grid>
        </>
    )

}

export default Users
import React,{useState} from 'react'
import { Button, Grid, Paper,TextField } from '@mui/material'
import services from '../services/service'

const style={
    field:{
        width:'90%',
        marginLeft:'5%',
        marginRight:'5%',
        marginBottom:"10px"
    }
}


function Login(){

    const initial ={
        no:'',
        password:''
    }

    const [state,setState] = useState(initial)

    const handleChange=(k,e)=>{

        setState(prev=>({
            ...prev,
            [k]:e
        }))

    }

    const loggedIn =()=>{

        if(state.no.length===10&&state.password.length>4){

            services.login(state.no,state.password)

        }else{

            alert('Enter valid No password')

        }

    }


    return(
        <Paper
        style={{
            width:'90%',
            marginLeft:'5%'
        }}
        >
            <h5 style={{
                textAlign:'center',
            }}>Login</h5>
            <Grid container item xs={12} md={12} spacing={2}>
                <Grid item xs={12} md={12} style={style.field} >
                     <TextField
                     size='small'
                     fullWidth
                     variant='outlined'
                     label='Enter No'
                     type='number'
                     value={state.no}
                     onChange={(e)=>handleChange('no',e.target.value)}
                     />
                </Grid>
                <Grid item xs={12} md={12} style={style.field}>
                     <TextField
                     fullWidth
                     size='small'
                     variant='outlined'
                     label='Enter password'
                     type='password'
                     value={state.password}
                     onChange={(e)=>handleChange('password',e.target.value)}
                     />
                </Grid>
                <Grid container item xs={12} md={12} spacing={2} style={{
                    marginBottom:'10px',
                    width:'90%',
                    marginLeft:'5%',
                    marginRight:'5%'
                }}>
                    <Grid item xs={6} md={6}>
                        <Button fullWidth variant='contained'>Cancel</Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button fullWidth variant='contained' onClick={loggedIn}>Loggin</Button>
                    </Grid>
                </Grid>
            </Grid>
            <h5 
                style={{
                    textAlign:'center',
                    color:'blue',
                    cursor:'pointers'
                }}
                onClick={()=>{
                    window.location.pathname='/createAccount'
                }}
                >Create Account</h5>
        </Paper>
    )

}

export default Login
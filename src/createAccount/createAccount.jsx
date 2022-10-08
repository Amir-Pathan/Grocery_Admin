import React,{Component} from "react";
import field from "./field";
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import services from "../services";
import { Button } from "@mui/material";

class CreateAccount extends Component{

    constructor(){

        super()
        this.state={
             name:'',
             hotelName:'',
             no:'',
             email:'',
             address:'',
             password:'',
             repassword:''
        }

        this.handleChange=this.handleChange.bind(this)

    }

    handleChange(e,key){

        this.setState({
            ...this,
            [key]:e
        })

    }

    submit(){

        if(this.state.name.length>0&&this.state.no.length===10&&this.state.address.length>0&&
            this.state.password.length>4&&this.state.password===this.state.repassword){

                 services.createAccount({
                    name:this.state.name,
                    hotelName:this.state.hotelName,
                    email:this.state.email,
                    password:this.state.password,
                    address:this.state.address,
                    no:this.state.no
                 })


            }else{

                  alert('Please Fill required field')

            }

    }


    render(){

        return(
            <Paper style={{
                margintop:'10px',
                marginLeft:'10px',
                marginRight:'10px'
            }}>
                <h1 style={{textAlign:'center'}}>Create Account</h1>
                <Grid container item xs={12} md={12} spacing={2}>
                    {
                        field.map((i,index)=>{

                            return <Grid item xs={12} md={6} key={index}>
                                <TextField label={i.placeHolder}
                                type={i.type}
                                required={i.require }
                                fullWidth
                                value={this.state[i.key]}
                                onChange={(e)=>this.handleChange(e.target.value,i.key)}
                                size="small"
                                style={{marginLeft:'1%',marginRight:'1%',width:'98%'}}
                                />
                            </Grid>

                        })
                    }
                </Grid>
                <Grid container item xs={12} md={12} spacing={2} 
                style={{
                    marginTop:'10px',
                    marginBottom:'10px'
                }}>
                    <Grid item xs={6} md={6}>
                        <Button variant='contained' fullWidth size='small'>Cancel</Button>
                    </Grid>
                    <Grid  item xs={6} md={6}>
                        <Button variant='contained' fullWidth size='small' onClick={this.submit.bind(this)}>Save</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                <h5 
                style={{
                    textAlign:'center',
                    color:'blue',
                    marginBottom:'20px'
                }}
                onClick={()=>window.location.pathname='/login'}
                >
                    Already Have Account ! Login
                </h5>
                </Grid>
            </Paper>
        ) 

    }


}

export default CreateAccount
import React, { useState,useEffect } from "react";
import { TextField,Paper,Grid, Button } from "@mui/material";
import field from "./field";
import UploadIamge from "../lib/imgUpload/imgUpload";
import services from "../services";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate,useParams } from "react-router-dom";

const style={
    paper:{
        marginTop:'25px',
        marginRight:'20px',
        marginLeft:'20px'
    },
    box:{
        marginLeft:'20px',
        
    }
}

function AddProduct(){

    const [categories,setCategories] = useState([])

    let state={
        productImg:'',
        productName:'',
        productOriginalPrice:0,
        productDiscountedPrice:0,
        productQty:'',
        productMinQty:1,
        productMaxQty:10,
        productStock:100,
        categoryId:'',
        productDescription:'',
        productActive:true,
        sellerId:''
    }

    const [product,setProduct]= useState(state)

    const [addProduct,setAddproduct] = useState(true)

    const navigate = useNavigate()

    const {id} = useParams()

    const getProduct =()=>{

        setAddproduct(false)

        services.getSingleData(id,'products').then((res)=>{

            for (var k in res){
                
                handleChange(k,res[k])

            }

        }).catch(err=>{
            console.log(err);
        })

    }


    useEffect(()=>{

        if(id!=='new'){
            getProduct()
        }

        const idd =services.getSeller()

        handleChange('sellerId',idd.id)

        services.getData('categories').then((res)=>{

            setCategories(res)

        }).catch((err)=>{
            console.log(err);
        })

    },[])

    const submit=()=>{

        if(product.productName.length>3&&product.productOriginalPrice>0&&product.productDiscountedPrice>0&&
            product.productMinQty>0&&product.productMaxQty>0&&product.productImg.length>0&&
            product.productDescription.length>0&&product.categoryId.length>0&&product.productDescription.length>4&&product.productStock>0&&product.sellerId.length>0){

                let prodct = {}

                for(var k in product){

                    if(k==='productOriginalPrice'||k==='productDiscountedPrice'||
                       k==='productMinQty'||k==='productMaxQty'||k==='productStock'){

                           prodct[k]=Number(product[k])

                     }else{

                        if(k==='productActive'){
                            prodct[k]=String(product[k]).toLowerCase()=='true'
                        }else{
                            prodct[k]=product[k]
                        }

                     }

                }

                if(addProduct){


                    services.addData('products',product).then((res)=>{

                        console.log(res);
    
                        navigate('/products')
    
                    }).catch((err)=>{
    
                        alert('Something wrong try again')
    
                    })

                }else{

                    services.updateData('products',prodct.id,prodct).then((res)=>{
                        console.log(res);
                        navigate('/products')
                    }).catch((err)=>{
                        console.log(err);
                        alert('something wrong trt again')
                    })

                }

            }else{

                console.log(product);

                alert('All Fields Are required')

            }

    }

    const handleChange=(k,e)=>{

        setProduct((prev)=>({
            ...prev,
            [k]:e
        }))


    }

    return(
        <>
        <Paper style={style.paper}>
            <h1 style={{textAlign:'center'}}>{addProduct?'Add':'Update'} Product</h1>
           <Grid item container xs={12} md={12} spacing={2}>
           <Grid item xs={12} md={16}>
                {
                    product.productImg.length?
                    <img src={product.productImg} 
                    style={{height:'60px',width:"80px"}}
                    />
                    :null
                }
            </Grid>
            <Grid item xs={12} md={6}>
                 <UploadIamge 
                 title={'product'}
                 k={'productImg'}
                 handleChange={(k,e)=>handleChange(k,e)}
                 />
            </Grid>

            {
                field.map((i,index)=>{

                    return <Grid item xs={12} md={6} key={index}>
                        <TextField label={i.label}
                        size='small'
                        type={i.type}
                        required={i.required}
                        fullWidth
                        value={product[i.key]}
                        onChange={(e)=>handleChange(i.key,e.target.value)}
                        />
                    </Grid>

                })
            }
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
               <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={product.categoryId}
               size='small'
               label="Select Category"
                onChange={(e)=>handleChange('categoryId',e.target.value)}
                >
                    {
                        categories.map((i,index)=>{
                            return <MenuItem key={index} value={i.id}>{i.categoryName}</MenuItem>
                        })
                    }
             </Select>
             </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Product Active</FormLabel>
                  <RadioGroup
                  defaultValue={product.productActive}
                   row
                   aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e)=>handleChange('productActive',e.target.value)}
                   >
                      <FormControlLabel value={true} control={<Radio />} label="Active" />
                      <FormControlLabel value={false} control={<Radio />} label="InActive" />
                    </RadioGroup>
                   </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Product Description"
              multiline
              fullWidth
              maxRows={4}
              value={product.productDescription}
               onChange={(e)=>handleChange('productDescription',e.target.value)}
            />
           </Grid>
           </Grid>
           <Grid container item xs={12} md={12} spacing={2} style={{
            marginTop:'10px',
            paddingBottom:'15px'
           }}>
            <Grid item xs={12} md={6}>
                <Button variant="contained" fullWidth>Cancel</Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button variant="contained" fullWidth 
                onClick={submit}
                >Save</Button>
            </Grid>
           </Grid>
        </Paper>
        </>
    )

}

export default AddProduct
import React,{Component} from 'react'
import { getUserSet } from '../redux'
import { Connect } from 'react-redux'
import { connect } from 'react-redux'
import { Grid,Button,Typography, TextField } from '@mui/material'
import BasicModal from '../lib/model'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UploadIamge from '../lib/imgUpload/imgUpload'
import services from '../services'
import ProductCard from '../lib/productcart'

class Categories extends Component{

    constructor(){

        super()
        this.state={
            open:false,
            categoryName:'',
            categoryDescription:'',
            isActive:true,
            categoryImg:'',
            isUpdate:false,
            categories :[]
        }
        this.handleClose=this.handleClose.bind(this)
        this.submitCategories=this.submitCategories.bind(this)

    }

    componentDidMount(){
        this.props.getUser()

        services.getData('categories').then((res)=>{

            this.handleChange('categories',res)

        }).catch((err)=>{

            alert('something went wrong try again')

        })        
    }

    handleClose(close){
        this.setState({
            ...this.state,
            open:close
        })
    }

    handleChange(k,e){

        this.setState({
            ...this.state,
            [k]:e
        })

    }

    submitCategories(){

        const {categoryName,categoryDescription,categoryImg,isActive} = this.state

        if(categoryImg.length>0&&categoryName.length>3&&categoryDescription.length>0){

             services.addData('categories',{
                categoryName:categoryName,
                categoryImg:categoryImg,
                categoryDescription:categoryDescription,
                categoryActive:isActive
             }).then((res)=>{

                this.handleChange('open',false)

             }).catch((err)=>{
                alert('Something went wrong try again')
                this.handleChange('open',false)
             })

        }else{

            alert('Something Missing')

        }

    }


    render(){

        console.log(this.state.user);

        return(
            <>
              {
                this.props.user.no==='7741943487'?
                  <Grid container item xs={12} md={12} style={{marginTop:'10px'}}>
                    <Grid item xs={10} md={10}>
                        <Typography>Categories</Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Button variant='contained'
                        onClick={()=>this.handleClose(true)}
                        >Add Categorie</Button>
                    </Grid>
                  </Grid>
                :null
              }
              <BasicModal 
              open={this.state.open}
              handleClose={(close)=>this.handleClose(close)}>
                <Grid container item xs={12} md={12} spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography 
                        style={{textAlign:'center'}}>{this.state.isUpdate?'Upadte': 'Add'} Categorie</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {
                            this.state.categoryImg.length>1?
                            <img src={this.state.categoryImg}
                            style={{
                                height:'100px',
                                width:'80px'
                            }}
                            />
                            :null
                        }
                    </Grid>
                    <Grid item xs={12} md={12}>
                         <UploadIamge 
                         title='Category'
                         k={'categoryImg'}
                         handleChange={(k,e)=>this.handleChange(k,e)}
                         val={this.state.categoryImg}
                         />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField size='small' fullWidth
                        label='Category Name'
                        value={this.state.categoryName}
                        onChange={(e)=>this.handleChange('categoryName',e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12} md={12}>
                        <TextField size='small' fullWidth
                        value={this.state.categoryDescription}
                        label='Category Description'
                        onChange={(e)=>this.handleChange('categoryDescription',e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12} md={12}>
                         <FormControl>
                         <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          defaultValue={this.state.isActive}
                          onChange={(e)=>this.handleChange('isActive',e.target.value)}
                        >
                           <FormControlLabel value={true} control={<Radio />} label="Active" />
                            <FormControlLabel value={false} control={<Radio />} label="InActive" />
        
                       </RadioGroup>
                    </FormControl>
                     </Grid>
                     <Grid container item xs={12} md={12}>
                        <Grid item xs={6} md={6}>
                            <Button variant='contained' 
                            onClick={()=>this.handleChange('open',false)}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Button variant='contained' 
                            onClick={this.submitCategories}>Add Category</Button>
                        </Grid>
                     </Grid>
                </Grid>
              </BasicModal>
              <Grid container item xs={12} md={12} spacing={2}>
                {
                    this.state.categories.length?
                       this.state.categories.map((i,index)=>{

                        return <Grid item xs={6} md={3} key={index}>
                            <ProductCard 
                            categoryName={i.categoryName} 
                            categoryImage={i.categoryImg}
                            categoryId={i.id}
                            isAdmin={this.props.user.no==='7741943487'?true:false}
                            isProduct={false}
                            />
                        </Grid>

                       })
                    :
                    <h1>Add Categories</h1>
                }
              </Grid>
            </>
        )

    }

}

const mapStateToProps=state=>{

    return{
        user:state.user.user
    }

}

const mapDispatchToProps=dispatch=>{

    return{
        getUser:()=>dispatch(getUserSet())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Categories)
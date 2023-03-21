import React,{Component} from "react";
import { Button, Grid } from "@mui/material";
import services from "../services";
import ProductCard from "../lib/productcart/productcart";
import Container from '@mui/material/Container'


class Products extends Component{


    constructor(){
        super()
        this.state={
            isAdmin:false,
            products:[]
        }
    }

    handleChange(k,e){

        this.setState({
            ...this.state,
            [k]:e
        })

    }

    componentDidMount(){

        const slr =services.getSeller()

        if(slr.no==='7741943487'){
             this.handleChange('isAdmin',true)
        }else{
            this.handleChange('isAdmin',false)
        }

        services.getData('products','sellerId',slr.id,slr.no).then((res)=>{

            this.handleChange('products',res)

        })

    }

    addproduct(path){

        window.location.pathname=path

    }


    render(){

        return(
            <Container>
            {
                this.state.isAdmin?
                  null:
                  <Grid container item xs={12} md={12}>
                  <Grid item xs={10} md={10}>
                      <h5>Products</h5>
                  </Grid>
                  <Grid item xs={2} md={2}>
                       <Button onClick={()=>this.addproduct('/addproduct/new')}>Add Product </Button>
                  </Grid>
               </Grid>
            }
            <Grid container item xs={12} md={12} spacing={1}>
                {
                    this.state.products.map((i,index)=>{

                        return <Grid item xs={6} md={3} key={index}>
                            <ProductCard 
                            name={i.productName} 
                            image={i.productImg} 
                            id={i.id} 
                            isAdmin={this.state.isAdmin}
                            isProduct={true}/>
                        </Grid>

                    })
                }
            </Grid>
            </Container>
        )

    }
    

}

export default Products
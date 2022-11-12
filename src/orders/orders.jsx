import React,{Component} from "react";
import services from "../services/service";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


class Orders extends Component{

    constructor(){

        super()
        this.state={
            orders:[],
            products:[],
            addresses:[]
        }
        this.getOrders=this.getOrders.bind(this)

    }


    handleChange(k,e){

        this.setState({
            [k]:e
        })

    }

    getOrders(){

        const user = services.getSeller()

        services.getData('orders','sellerId',user.id,user.no).then((res)=>{

            this.handleChange('orders',res)


        const productspromises= []

        const addressespromises = []

            res.forEach(i => {
                
               productspromises.push(services.getSingleData(i.productId,'products'))

               addressespromises.push(services.getSingleData(i.addressId,'addresses'))

            });

            Promise.all(productspromises).then((res)=>{

                this.handleChange('products',res)

            }).catch((err)=>{
                console.log(err);
            })

            Promise.all(addressespromises).then((res)=>{

                this.handleChange('addresses',res)

            }).catch((err)=>{
                console.log(err);
            })

        }).catch((err)=>{
            console.log(err);
        })

    }

    componentDidMount(){

         this.getOrders()

    }

    handleStatus(val,id,indx){

        let dc =this.state.orders[indx]

        dc.status=val

        services.updateData('orders',id,dc).then((res)=>{
            this.state.orders[indx].status=val
        }).catch((err)=>{
            alert('somethinh wrong update again')
        })

    }

    render(){

        const status = ['Accepted','packed','out for delivery','delivered']

        console.log(this.state);

        return(
            <>
              <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                     <TableRow>
                        <StyledTableCell>product Image</StyledTableCell>
                        <StyledTableCell align="right">ProductName</StyledTableCell>
                        <StyledTableCell align="right">Product Qty</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Qty</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                        <StyledTableCell align="right">Customer Name</StyledTableCell>
                        <StyledTableCell align="right">Customer Address</StyledTableCell>
                        <StyledTableCell align="right">Customer No</StyledTableCell>
                        <StyledTableCell align="right">Landmark</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                     </TableRow>
                    </TableHead>
                <TableBody>
                    {
                    this.state.orders.length>0?
                    this.state.products.map((i,index) => (
                       <StyledTableRow key={index}>
                       <StyledTableCell component="th" scope="row">
                         <img src={i.productImg} alt="" style={{width:'50px'}}/>
                       </StyledTableCell>
                       <StyledTableCell align="right">{i.productName}</StyledTableCell>
                       <StyledTableCell align="right">{i.productQty}</StyledTableCell>
                       <StyledTableCell align="right">{this.state.orders[index].discountedPrice}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.orders[index].qty}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.orders[index].qty*this.state.orders[index].discountedPrice}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.addresses[index].name}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.addresses[index].address}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.addresses[index].no}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.addresses[index].landmark}</StyledTableCell>
                    <StyledTableCell align="right">{this.state.orders[index].date}</StyledTableCell>
                    <StyledTableCell align="right">
                        {this.state.orders[index].status}
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={this.state.orders[index].status}
                        label="status"
                        onChange={(e)=>this.handleStatus(e.target.value,this.state.orders[index].id,index)}
                        size='small'
                        >
                            {
                                status.map((i,index)=>{
                                    return   <MenuItem key={index} value={i}>{i}</MenuItem>
                                })
                            }
                    </Select>
                    </StyledTableCell>
                    </StyledTableRow>
                    )):null
                    }
                </TableBody>
              </Table>
             </TableContainer>
            </>
        )

    }

}

export default Orders
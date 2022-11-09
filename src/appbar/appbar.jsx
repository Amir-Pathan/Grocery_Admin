import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSelector,useDispatch } from 'react-redux';
import { getUserSet } from '../redux';
import { useNavigate } from 'react-router-dom';

const style ={
  path:{
    borderBottom:'2px solid blue'
  }
}

export default function AppBBarr() {

  const user=useSelector(state=>state.user.user)

  const [path,setPath] = React.useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  React.useEffect(()=>{

      dispatch(getUserSet())

      setPath(window.location.pathname)

      console.log(user);

  },[])

  const toPath=(path)=>{
    setPath(path)
    navigate(path)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{
        backgroundColor:"white",
        color:'black'
      }}>
        <Toolbar>
            <Typography variant='h6'> {user.hotelName} Grocery</Typography>
            <div style={{
              marginLeft:'25px',
              marginTop:'15px'
            }}>
            <Button color='inherit'
            onClick={()=>toPath('/categories')}
            style={path==='/categories'?style.path:null}>Categories</Button>
            <Button color="inherit" style={path==='/products'?style.path:null}
            onClick={()=>toPath('/products')}>Products</Button>
            <Button color="inherit" style={path==='/orders'?style.path:null}>Orders</Button>
            {
               user.no==='7741943487'?
               <>
               <Button color='inherit' style={path==='/customers'?style.path:null}>Customers</Button>
               <Button color='inherit' style={path==='/sellers'?style.path:null}>Sellers</Button>
               </>
               :null
            }
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

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
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

const style ={
  path:{
    borderBottom:'2px solid blue',
    color:'blue'
  }
}

export default function AppBBarr() {

  const [path,setPath] = React.useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const user=useSelector(state=>state.user.user)

  React.useEffect(()=>{

      dispatch(getUserSet())

      setPath(window.location.pathname)

      console.log(user);

  },[])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);

  };
  
  

  const toPath=(path)=>{
    
    setPath(path)

    navigate(path)
  
  }
  const handleClose = () => {

    setAnchorEl(null);

  }

  let logout =()=>{

     localStorage.removeItem('seller')

    navigate('/login')

     handleClose()
 
  }


  return (
    <>
      <AppBar position="static" style={{
        backgroundColor:"white",
        color:'black'
      }}>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1,display:'flex',flexDirection:'row',alignItems:"baseline" }}> 
            <Typography variant='h6'> {user.hotelName} Grocery</Typography>
            <div style={{
              marginLeft:'25px',
            }}>
            <Button color='inherit'
            onClick={()=>toPath('/categories')}
            style={path==='/categories'?style.path:null}>Categories</Button>
            <Button color="inherit" style={path==='/products'?style.path:null}
            onClick={()=>toPath('/products')}>Products</Button>
            <Button color="inherit" style={path==='/orders'?style.path:null}
            onClick={()=>toPath('/orders')}
            >Orders</Button>
            {
               user.no==='7741943487'?
               <>
               <Button color='inherit' style={path==='/customers'?style.path:null}
               onClick={()=>toPath('/customers')}>Customers</Button>
               <Button color='inherit' style={path==='/sellers'?style.path:null}
               onClick={()=>toPath('/sellers')}>Sellers</Button>
               </>
               :null
            }
            </div>
          </Box>
          <Box component="div" sx={{ display:'flex',flexDirection:'row',alignItems:"baseline" }}>
            <IconButton onClick={handleClick}>
                <AccountCircle/>
            </IconButton>
            <Menu
             id="basic-menu"
             anchorEl={anchorEl}
             open={open}
             onClose={handleClose}
             >
               <MenuItem onClick={handleClose}> <AccountCircle/>   Profile</MenuItem>
               <MenuItem onClick={logout}><LogoutIcon/> Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom';


const style ={
  editIcon:{
    marginLeft:'80%'
  }
}

export default function ProductCard({name,image,categoryDescription,categoryActive,id,isAdmin,isProduct,updateCategory}) {

  const [isVisible,setIsvisible] = React.useState(false)

  const handleChange=(val)=>{

    setIsvisible(val)

  }

  const categoryUpdate=()=>{

    updateCategory(id,name,image,categoryActive,categoryDescription)

  }

  const navigete = useNavigate()

  const toPath=()=>navigete('/addproduct/'+id)

  return (
    <Card sx={{ maxWidth: 345 }} 
    onMouseEnter={()=>handleChange(true)}
    onMouseLeave={()=>handleChange(false)}
    >
      {
        isAdmin&&!isProduct?
          isVisible?
          <IconButton 
          style={style.editIcon}
          onClick={categoryUpdate}
          >
              <EditIcon />
           </IconButton>:
           null
        :!isAdmin&&isProduct?
        isVisible?
        <IconButton 
        style={style.editIcon}
        onClick={toPath}
        >
            <EditIcon/>
         </IconButton>:
         null
        :null
      }
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

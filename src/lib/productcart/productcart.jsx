import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton'

export default function ProductCard({categoryName,categoryImage,categoryId,isAdmin,isProduct}) {

  const [isVisible,setIsvisible] = React.useState(false)

  const handleChange=(val)=>{

    setIsvisible(val)

  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea 
      onMouseEnter={()=>handleChange(true)}
      onMouseLeave={()=>handleChange(false)}
      >
      {
        isAdmin&&!isProduct?
          isVisible?
          <IconButton 
          >
              <EditIcon/>
           </IconButton>:
           null
        :null
      }
        <CardMedia
          component="img"
          height="140"
          image={categoryImage}
          alt={categoryName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {categoryName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

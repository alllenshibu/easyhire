
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
        
      <CardMedia
        component="img"
        alt="company"
        height="140"
        align="right"
        image="https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_1920%2Cc_limit/9.%2520DeLorean-Alpha-5%2520%255BDeLorean%255D.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Oracle
        </Typography>
        <Typography variant="body2" color="text.secondary">
          50 Applicants
        </Typography>
        <Typography variant="body2" color="text.secondary">
          30 Shortlisted
        </Typography>
        <Typography variant="body2" color="text.secondary">
          20 Selected
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
 
      </CardActions>
    </Card>
  );
}

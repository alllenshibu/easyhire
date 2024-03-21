import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { Button, CardMedia } from '@mui/material';
export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 10 }} container spacing={0}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={10}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  height: 320,
                  width: 300,
                  backgroundColor: "#ADD8E6",
                }}
              >
                <CardMedia
        component="img"
        height="254"
        image={"https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_1920%2Cc_limit/9.%2520DeLorean-Alpha-5%2520%255BDeLorean%255D.jpg"}
        alt="img"
        
      />
      <Button variant="solid" color="warning" position="center">
          Name
        </Button>
                </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

function Home() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Button component={Link} to="/okrug" variant="contained" color="primary">
          Okrug
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/grad" variant="contained" color="primary">
          Grad
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/opstina" variant="contained" color="primary">
          Opstina
        </Button>
      </Grid>
    </Grid>
  );
}

export default Home;
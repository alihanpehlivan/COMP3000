import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const SidebarLocation = () => {
  return (
    <React.Fragment>
      <Paper elevation={1} sx={{ padding: 1, mb: 1, alignItems: 'center' }}>
        <Grid
          container
          direction='row'
          alignItems='center'
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography variant='subtitle2'>
            <LocationOnOutlinedIcon fontSize='inherit' />
            Plymouth
          </Typography>
          <Button variant='outlined' size={'small'}>
            Change
          </Button>
        </Grid>
      </Paper>
      <Grid
        container
        direction='row'
        alignItems='center'
        sx={{ padding: 1, mb: 1, alignItems: 'center' }}
      >
        <RestaurantIcon fontSize='inherit' />{' '}
        <Typography variant='subtitle2' sx={{ ml: 2 }}>
          Categories (A-Z)
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default SidebarLocation;

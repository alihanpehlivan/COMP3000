import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Header, { Sections } from '../Header';
import Sidebar from './sidebar';
import Places from './places';

const index = () => {
  return (
    <Container maxWidth='lg'>
      <Header title='Title' sections={Sections} />
      <Grid container spacing={2}>
        {/* Left Area */}
        <Grid item xs={12} md={3} sx={{ mt: 2 }}>
          <Sidebar />
        </Grid>
        {/* Right Area */}
        <Grid item xs={12} md={9} sx={{ mt: 2 }}>
          <Places />
        </Grid>
      </Grid>
    </Container>
  );
};

export default index;

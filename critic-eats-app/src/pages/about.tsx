import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Header, { Sections } from './components/Header';
import Footer from './components/Footer';

const about = () => {
  return (
    <Container maxWidth='lg'>
      <Header title='CriticEats' sections={Sections} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          About this project ...
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default about;

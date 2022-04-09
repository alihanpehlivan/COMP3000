import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header, { Sections } from './components/Header';
import Sidebar from './components/Home/sidebar';
import Places from './components/Home/places';
import Footer from './components/Footer';

const index = () => {
  return (
    <Container maxWidth='lg'>
      <Header title='CriticEats' sections={Sections} />
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
      <Footer />
    </Container>
  );
};

export default index;

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Head } from '@/components/Head';

export const Landing = () => {
  return (
    <React.Fragment>
      <Head description={'Welcome to CriticEats.'} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Typography variant={'h3'}> Welcome to CriticEats.</Typography>
        <Typography variant={'subtitle1'} sx={{ marginTop: '1rem' }}>
          A place where you can share your dining experiences.
        </Typography>
      </Container>
    </React.Fragment>
  );
};

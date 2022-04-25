import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
          textAlign: 'center',
        }}
      >
        <Typography variant={'h3'}>
          Welcome to CriticEats
          <span aria-label="emoji" role="img">
            🍴
          </span>
        </Typography>
        <Typography variant={'subtitle1'} sx={{ marginTop: '1rem' }}>
          A place where you can share your dining experiences.
        </Typography>
        <Button
          component={RouterLink}
          to={'//app/places'}
          sx={{ marginTop: '1rem' }}
        >
          Continue
        </Button>
      </Container>
    </React.Fragment>
  );
};

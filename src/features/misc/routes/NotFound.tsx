import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Typography variant={'h2'}>Something is wrong.</Typography>
      <Typography variant={'h6'}>We must have misplaced that page.</Typography>
      <Button
        sx={{ marginTop: '2rem' }}
        variant={'outlined'}
        onClick={() => window.location.assign(window.location.origin)}
      >
        Take me home!
      </Button>
    </Box>
  );
};

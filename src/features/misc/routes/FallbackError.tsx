import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ErrorFallback = () => {
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
      <Typography variant={'h4'} color={'secondary'}>
        Ooops, something went wrong
        <span aria-label="emoji" role="img">
          💔
        </span>
      </Typography>
      <Button
        sx={{ marginTop: '2rem' }}
        variant={'contained'}
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </Box>
  );
};

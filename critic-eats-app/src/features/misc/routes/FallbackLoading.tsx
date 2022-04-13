import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingFallback = (vp = true) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: vp ? '100vh' : '100%',
        width: vp ? '100vw' : '100%',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

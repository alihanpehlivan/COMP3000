import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

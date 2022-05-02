import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import {
  RecentPlacesImageList,
  RecentReviewsImageList,
} from '@/features/dashboard';

export const Dashboard = () => {
  return (
    <Paper
      sx={{ margin: '1rem 0rem 2rem 0rem', padding: '1rem 2rem 2rem 2rem' }}
      elevation={4}
    >
      <Typography variant="h5">Dashboard</Typography>
      <RecentPlacesImageList />
      <RecentReviewsImageList />

      <Divider variant="middle">
        <Chip label="or..." />
      </Divider>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        component={RouterLink}
        to={'//app/places'}
      >
        List All Places
      </Button>
    </Paper>
  );
};

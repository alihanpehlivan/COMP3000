import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LoadingFallback } from '@/features/misc';
import { ReviewCreate } from '@/features/reviews';
import { ReviewImageList } from '@/features/reviews';
import { useUser } from '@/features/user';

import { usePlace } from '../api/getPlace';
import { PlaceDelete } from '../components/PlaceDelete';
import { PlaceUpdate } from '../components/PlaceUpdate';

export const Place = () => {
  const [isWindowLoading, setWindowLoading] = React.useState(false);
  const [currentOpenDialogName, setCurrentOpenDialogName] = React.useState('');

  const user = useUser();
  const { placesId } = useParams();
  const placeData = usePlace(placesId);

  if (placeData.loading || isWindowLoading) {
    return <LoadingFallback />;
  }

  const place = placeData.place;

  return (
    <Paper
      sx={{ margin: '1rem 0rem 2rem 0rem', padding: '1rem 2rem 2rem 2rem' }}
      elevation={4}
    >
      <Box display="flex" flexWrap="wrap" alignItems="center">
        <Typography variant="h6">
          {place.name}
          {user.isLoggedIn && user.data.id === place.uuid && (
            <React.Fragment>
              <Tooltip title="Edit">
                <IconButton
                  size="large"
                  edge="end"
                  color="primary"
                  onClick={() => {
                    setCurrentOpenDialogName('edit');
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="large"
                  edge="end"
                  color="primary"
                  onClick={() => {
                    setCurrentOpenDialogName('delete');
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <Button
            disabled={!user.isLoggedIn}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => {
              setCurrentOpenDialogName('post_review');
            }}
          >
            Post Review
          </Button>
        </Box>
      </Box>

      <Typography variant="subtitle1">{place.description}</Typography>

      <ReviewCreate
        placeId={place.id}
        isWindowOpen={currentOpenDialogName === 'post_review'}
        setCurrentOpenDialogName={setCurrentOpenDialogName}
      />

      <PlaceUpdate
        place={place}
        isWindowOpen={currentOpenDialogName === 'edit'}
        setCurrentOpenDialogName={setCurrentOpenDialogName}
      />

      <PlaceDelete
        placeId={place.id}
        isWindowOpen={currentOpenDialogName === 'delete'}
        setCurrentOpenDialogName={setCurrentOpenDialogName}
        setWindowLoading={setWindowLoading}
      />

      <ReviewImageList id={place.id} />
    </Paper>
  );
};

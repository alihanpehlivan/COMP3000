import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { LoadingFallback } from '@/features/misc';

import { usePlace } from '../api/getPlace';

import { PlaceUpdate } from './PlaceUpdate';

export const Place = () => {
  const { placesId } = useParams();
  const place = usePlace(placesId);

  if (place.loading) {
    return <LoadingFallback />;
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 2 }}>
          <Typography variant="h6">{place.place.name}</Typography>
          <Typography variant="subtitle1">{place.place.description}</Typography>
          <PlaceUpdate place={place.place} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

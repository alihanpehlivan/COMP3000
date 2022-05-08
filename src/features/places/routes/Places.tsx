import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useUser } from '@/features/user/';

import { usePlaces } from '../api/getPlaces';
import { PlaceCreate } from '../components/PlaceCreate';
import { Place } from '../types';

const PlaceItemSkeleton = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        maxHeight: { xs: 300, md: 132 },
        mb: 2,
      }}
    >
      <Skeleton
        sx={{ height: 190, width: 236 }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent sx={{ flex: 1 }}>
        <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={40} width="80%" />
      </CardContent>
    </Card>
  );
};

const PlaceItem = (place: Place) => {
  return (
    <CardActionArea
      key={place.id}
      sx={{ mb: 2 }}
      component={RouterLink}
      to={`./${place.id}`}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxHeight: { xs: 300, md: 132 },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxWidth: { md: 236 },
            maxHeight: { xs: 132, md: 132 },
          }}
          height={132}
          image={place.coverImageURI}
          alt={place.name}
          loading="lazy"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{place.name}</Typography>
          <Typography variant="caption" paragraph>
            {place.description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const ItemList = () => {
  const places = usePlaces();

  if (places.loading) {
    return (
      <React.Fragment>
        {[0, 1, 2, 3].map((key) => (
          <PlaceItemSkeleton key={key} />
        ))}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {places.places.map((place) => PlaceItem(place))}
      </React.Fragment>
    );
  }
};

export const Places = () => {
  const [currentOpenDialogName, setCurrentOpenDialogName] = React.useState('');
  const user = useUser();

  return (
    <Paper
      sx={{ margin: '1rem 0rem 2rem 0rem', padding: '1rem 1rem 1rem 1rem' }}
      elevation={4}
    >
      <Box display="flex" flexWrap="wrap" alignItems="center" marginBottom={2}>
        <Typography variant="h6">Place List</Typography>
        {user.isLoggedIn && (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            }}
          >
            <LoadingButton
              loading={user.isLoading}
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => setCurrentOpenDialogName('create_place')}
            >
              Create Place
            </LoadingButton>
            <PlaceCreate
              isWindowOpen={currentOpenDialogName === 'create_place'}
              setCurrentOpenDialogName={setCurrentOpenDialogName}
            />
          </Box>
        )}
      </Box>
      <ItemList />
    </Paper>
  );
};

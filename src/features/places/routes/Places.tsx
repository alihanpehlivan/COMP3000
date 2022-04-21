import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { LoadingFallback } from '@/features/misc';
import { db } from '@/providers/firebase';
import { BaseEntity } from '@/types';

import { usePlaces } from '../api/getPlaces';
import { Place } from '../types';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const SidebarItem = styled(ToggleButton)(({ theme }) => ({
  textTransform: 'initial',
}));

const SidebarCategory = () => {
  const [categories, setCategory] = React.useState<string[]>([]);

  const handleCategory = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setCategory(newFormats);
  };

  return (
    <StyledToggleButtonGroup
      orientation="vertical"
      fullWidth={true}
      value={categories}
      onChange={handleCategory}
    >
      {['British', 'Turkish', 'Greek', 'African', 'Caribbean'].map((value) => {
        return (
          <SidebarItem key={value} value={value} disableRipple={true}>
            {value}
          </SidebarItem>
        );
      })}
    </StyledToggleButtonGroup>
  );
};

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
          image={'https://picsum.photos/128/128'}
          alt={place.name}
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

const DeleteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaseEntity>({ defaultValues: { id: '' } });

  async function onSubmit(data: BaseEntity) {
    setLoading(true);
    const docRef = doc(db, 'places', data.id);
    await deleteDoc(docRef);
    setLoading(false);
    reset();
  }

  const [isLoading, setLoading] = React.useState(false);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('id', {
          required: 'This is required.',
          minLength: { value: 1, message: 'id is too short.' }, // { value: 4, message: 'Name is too short.' },
          maxLength: { value: 80, message: 'id is too long.' },
        })}
        error={!!errors.id?.message}
        helperText={errors.id ? errors.id.message : ''}
        placeholder="doc id"
        fullWidth
        variant="outlined"
        margin={'normal'}
      />

      <Box display="flex" justifyContent="flex-end">
        <LoadingButton
          loading={isLoading}
          type="submit"
          color="primary"
          variant="contained"
        >
          Delete Entry
        </LoadingButton>
      </Box>
    </form>
  );
};

export const Places = () => {
  return (
    <Grid container spacing={2}>
      {/* Left Area */}
      <Grid item xs={12} md={3} sx={{ mt: 2 }}>
        <SidebarCategory />
      </Grid>
      {/* Right Area */}
      <Grid item xs={12} md={9} sx={{ mt: 2 }}>
        <ItemList />
        <DeleteForm />
      </Grid>
    </Grid>
  );
};

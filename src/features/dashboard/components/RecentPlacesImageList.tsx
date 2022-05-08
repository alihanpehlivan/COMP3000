import FlagIcon from '@mui/icons-material/Flag';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { useRecentPlaces } from '../api/useRecentPlaces';

export const RecentPlacesImageList = () => {
  const reviews = useRecentPlaces();

  console.log(reviews.data);

  return (
    <ImageList sx={{ mt: '1rem', mb: '1rem' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          <Typography variant="overline">
            Recently Posted Places
            <FlagIcon fontSize="inherit"></FlagIcon>
          </Typography>
        </ListSubheader>
      </ImageListItem>
      {reviews.data.map((item) => (
        <ImageListItem
          key={item.id}
          component={RouterLink}
          to={`./places/${item.id}`}
        >
          <img
            src={item.coverImageURI}
            srcSet={item.coverImageURI}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar title={item.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

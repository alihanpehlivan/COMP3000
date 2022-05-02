import FlagIcon from '@mui/icons-material/Flag';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import { useRecentPlaces } from '../api/useRecentPlaces';

export const RecentPlacesImageList = () => {
  const reviews = useRecentPlaces();

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
        <ImageListItem key={item.id} component={Link} href="#">
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=512&fit=crop&auto=format`}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=512&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar title={item.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

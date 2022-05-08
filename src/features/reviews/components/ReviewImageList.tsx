import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { useReviews } from '../api/getReviews';

interface ReviewImageListProps {
  id: string;
}

export const ReviewImageList = ({ id }: ReviewImageListProps) => {
  const reviews = useReviews(id);

  if (reviews.data.length === 0) {
    return (
      <Typography textAlign="center">
        There are no reviews for this place, yet...
      </Typography>
    );
  }

  return (
    <ImageList sx={{ mt: '1rem' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          sx={{ display: 'flex', alignItems: 'center', lineHeight: 'initial' }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography variant="overline">Reviews</Typography>
          </Box>
          <Box sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography variant="overline">Average Score:</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Rating
              name="rating"
              defaultValue={0}
              readOnly
              sx={{ verticalAlign: 'middle' }}
            />
          </Box>
        </ListSubheader>
      </ImageListItem>
      {reviews.data.map((item) => (
        <ImageListItem
          key={item.id}
          component={RouterLink}
          to={`//app/reviews/${item.id}`}
        >
          <img
            src={item.coverImageURI}
            srcSet={item.coverImageURI}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={`@${item.username}`} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

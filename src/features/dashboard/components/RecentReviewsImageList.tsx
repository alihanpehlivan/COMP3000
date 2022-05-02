import StarBorderIcon from '@mui/icons-material/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import { useRecentReviews } from '../api/useRecentReviews';

export const RecentReviewsImageList = () => {
  const reviews = useRecentReviews();

  return (
    <ImageList sx={{ mt: '1rem', mb: '1rem' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          <Typography variant="overline">
            Recently Posted Reviews
            <StarBorderIcon fontSize="inherit"></StarBorderIcon>
          </Typography>
        </ListSubheader>
      </ImageListItem>
      {reviews.data.map((item) => (
        <ImageListItem key={item.id} component={Link} href="#">
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=512&fit=crop&auto=format`}
            srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=512&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={`@${item.username}`} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

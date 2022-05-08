import StarBorderIcon from '@mui/icons-material/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Review } from '@/features/reviews';

import { useRecentReviews } from '../api/useRecentReviews';

export const RecentReviewsImageList = () => {
  const reviews = useRecentReviews();

  return (
    <React.Fragment>
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
          <ImageListItem
            key={item.id}
            component={RouterLink}
            to={`./reviews/${item.id}`}
          >
            <img
              src={item.coverImageURI}
              srcSet={item.coverImageURI}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={`@${item.username}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </React.Fragment>
  );
};

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { useReviews } from '../api/getReviews';

interface ReviewImageListProps {
  id: string;
}

export const ReviewImageList = ({ id }: ReviewImageListProps) => {
  const reviews = useReviews(id);

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

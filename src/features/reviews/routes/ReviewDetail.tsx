import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { doc, updateDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useUser } from '@/features/user';
import { db } from '@/providers/firebase';

import { useReview } from '../api/getReview';
import { ReviewCoverPhoto } from '../components/ReviewCoverPhoto';

export const ReviewDetail = () => {
  const user = useUser();
  const { reviewId } = useParams();
  const reviewData = useReview(reviewId);
  const { enqueueSnackbar } = useSnackbar();

  const review = reviewData.review;

  const updateRating = async (rating: number) => {
    const ref = doc(db, `reviews/${reviewId}`);
    updateDoc(ref, { rating: rating })
      .then(() => {
        // Everything went okay.
        enqueueSnackbar('Your rating has been updated!', {
          variant: 'success',
        });
      })
      .catch((e) => {
        enqueueSnackbar('Error:' + e.message, {
          variant: 'error',
        });
      });
  };

  return (
    <Paper
      sx={{ margin: '1rem 0rem 2rem 0rem', padding: '1rem 2rem 2rem 2rem' }}
      elevation={4}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        marginBottom="1rem"
      >
        <Typography variant="h6">
          {review.title}
          {user.isLoggedIn && user.data.id === review.uuid && (
            <React.Fragment>
              <Tooltip title="Edit">
                <IconButton size="large" edge="end" color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="large" edge="end" color="primary">
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
          {user.data.id === review.uuid ? (
            <React.Fragment>
              Your Rating:
              <Rating
                name="rating"
                value={Number(review.rating)}
                size="large"
                sx={{ verticalAlign: 'middle' }}
                onChange={(event, newValue) => {
                  const newRating = newValue ? newValue : 0;
                  updateRating(newRating);
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Rated:
              <Rating
                name="rating"
                value={Number(review.rating)}
                size="large"
                sx={{ verticalAlign: 'middle' }}
                readOnly
              />
            </React.Fragment>
          )}
        </Box>
      </Box>

      <ReviewCoverPhoto
        reviewId={review.id}
        isOwner={user.isLoggedIn && user.data.id === review.uuid}
      />

      <Typography variant="h6">{review.description}</Typography>

      {/*
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
      */}
    </Paper>
  );
};

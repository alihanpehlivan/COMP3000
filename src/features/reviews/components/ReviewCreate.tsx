import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm, Controller } from 'react-hook-form';

import { db, auth } from '@/providers/firebase';

import { Review } from '../types';

interface ReviewCreateProps {
  placeId: string;
  isWindowOpen: boolean;
  setCurrentOpenDialogName: React.Dispatch<React.SetStateAction<string>>;
}

export const ReviewCreate = ({
  placeId,
  isWindowOpen,
  setCurrentOpenDialogName,
}: ReviewCreateProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(data: Review) {
    console.log(data);
  }

  return (
    <Dialog
      open={isWindowOpen}
      onClose={() => {
        setCurrentOpenDialogName('');
      }}
      // Reset form state when opening
      TransitionProps={{ onEnter: () => reset() }}
    >
      <DialogTitle>Post Review</DialogTitle>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ marginBottom: '0.5rem' }}>
            Your rating:
            <Controller
              name="rating"
              control={control}
              rules={{ required: 'Rating is required.' }}
              render={(props) => (
                <Rating
                  name="rating"
                  onChange={props.field.onChange}
                  value={Number(props.field.value)}
                  size="large"
                  sx={{ verticalAlign: 'middle' }}
                />
              )}
            />
            <Typography variant="caption" color="error" margin="normal">
              {errors.rating ? errors.rating.message : ''}
            </Typography>
          </Typography>

          <TextField
            {...register('title', {
              required: 'Review summary is required.',
              minLength: { value: 1, message: 'Review summary is too short.' },
              maxLength: { value: 80, message: 'Review summary is too long.' },
            })}
            error={!!errors.title?.message}
            helperText={errors.title ? errors.title.message : ''}
            fullWidth
            variant="outlined"
            label="Review Summary"
            autoComplete="off"
          />

          <TextField
            {...register('description', {
              required: 'Review description is required.',
              minLength: {
                value: 1,
                message: 'Review description is too short.',
              },
              maxLength: {
                value: 200,
                message: 'Review description is too long.',
              },
            })}
            error={!!errors.description?.message}
            helperText={errors.description ? errors.description.message : ''}
            label="Review Description"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            margin={'normal'}
          />

          <DialogActions>
            <Button
              onClick={() => {
                setCurrentOpenDialogName('');
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

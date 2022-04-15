import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { doc, updateDoc } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { db } from '@/providers/firebase';

import { Place } from '../types';

interface PlaceUpdateProps {
  place: Place;
}

export const PlaceUpdate = ({ place }: PlaceUpdateProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Place>({
    defaultValues: { name: place.name, description: place.description },
  });

  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(data: Place) {
    setLoading(true);

    const ref = doc(db, 'places', place.id);
    await updateDoc(ref, { name: data.name, description: data.description })
      .then(() => {
        enqueueSnackbar('Your post have been updated successfully.', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar('Update failed with: ' + error.code, {
          variant: 'error',
        });
        return;
      });

    setLoading(false);
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Place</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register('name', {
                required: 'This is required.',
                minLength: { value: 1, message: 'Name is too short.' }, // { value: 4, message: 'Name is too short.' },
                maxLength: { value: 80, message: 'Name is too long.' },
              })}
              error={!!errors.name?.message}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
              variant="outlined"
              placeholder="Name"
              autoComplete="off"
            />

            <TextField
              {...register('description', {
                required: 'This is required.',
                minLength: { value: 1, message: 'Description is too short.' }, // minLength: { value: 15, message: 'Content is too short.' },
                maxLength: { value: 200, message: 'Description is too long.' },
              })}
              error={!!errors.description?.message}
              helperText={errors.description ? errors.description.message : ''}
              placeholder="Description"
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              margin={'normal'}
            />

            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
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
        </form>
      </Dialog>
    </React.Fragment>
  );
};

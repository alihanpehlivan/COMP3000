import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

import { db, auth } from '@/providers/firebase';

import { Place } from '../types';

interface PlaceCreateProps {
  isWindowOpen: boolean;
  setCurrentOpenDialogName: React.Dispatch<React.SetStateAction<string>>;
}

export const PlaceCreate = ({
  isWindowOpen,
  setCurrentOpenDialogName,
}: PlaceCreateProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Place>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(data: Place) {
    setLoading(true);
    const colRef = collection(db, 'places');
    await addDoc(colRef, {
      uuid: user?.uid,
      name: data.name,
      description: data.description,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        enqueueSnackbar('You have successfully posted a new place.', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar('Creating a place failed with error: ' + error.code, {
          variant: 'error',
        });
      }); // post the data
    setLoading(false);

    // Close the dialog
    setCurrentOpenDialogName('');
  }

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      open={isWindowOpen}
      onClose={() => {
        setCurrentOpenDialogName('');
      }}
      // Reset the form when opening it
      TransitionProps={{ onEnter: () => reset() }}
    >
      <DialogTitle>Create Place</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name', {
              required: 'Place name is required.',
              minLength: { value: 1, message: 'Place name is too short.' },
              maxLength: { value: 80, message: 'Place name is too long.' },
            })}
            error={!!errors.name?.message}
            helperText={errors.name ? errors.name.message : ''}
            placeholder="Place Name"
            fullWidth
            variant="outlined"
          />

          <TextField
            {...register('description', {
              required: 'Place description is required.',
              minLength: {
                value: 1,
                message: 'Place description is too short.',
              },
              maxLength: {
                value: 200,
                message: 'Place description is too long.',
              },
            })}
            error={!!errors.description?.message}
            helperText={errors.description ? errors.description.message : ''}
            placeholder="Place Description"
            fullWidth
            multiline
            rows={5}
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
              Add Entry
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

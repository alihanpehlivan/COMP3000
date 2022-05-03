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

import { updateUser } from '../api/updateUser';
import { User } from '../types';

interface UserUpdateProps {
  userId: string;
  isWindowOpen: boolean;
}

export const UserUpdate = ({ userId, isWindowOpen }: UserUpdateProps) => {
  const [isLoading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: userId,
      username: '',
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(data: User) {
    setLoading(true);
    await updateUser({ id: data.id, username: data.username })
      .then(() => {
        enqueueSnackbar('Username has been set.', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar('Username set failed with: ' + error.code, {
          variant: 'error',
        });
      });
    setLoading(false);
  }

  return (
    <Dialog open={isWindowOpen}>
      <DialogTitle>Set Your Username</DialogTitle>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ marginTop: '-1rem' }}>
          <TextField
            {...register('username', {
              required: 'Username is required.',
              minLength: { value: 1, message: 'Username is too short.' },
              maxLength: { value: 80, message: 'Username is too long.' },
            })}
            error={!!errors?.username}
            helperText={errors?.username ? errors?.username.message : ''}
            fullWidth
            variant="outlined"
            label="Username"
            autoComplete="off"
          />

          <DialogActions disableSpacing>
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

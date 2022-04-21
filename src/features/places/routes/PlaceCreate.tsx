import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { db } from '@/providers/firebase';

import { Place } from '../types';

export const CreatePlace = () => {
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Place>({
    defaultValues: { name: '', description: '' },
  });

  async function onSubmit(data: Place) {
    setLoading(true);
    const colRef = collection(db, 'places');
    await addDoc(colRef, {
      name: data.name,
      description: data.description,
      createdAt: serverTimestamp(),
    }); // post the data
    setLoading(false);
    reset();
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name', {
          required: 'This is required.',
          minLength: { value: 1, message: 'Name is too short.' }, // { value: 4, message: 'Name is too short.' },
          maxLength: { value: 80, message: 'Name is too long.' },
        })}
        error={!!errors.name?.message}
        helperText={errors.name ? errors.name.message : ''}
        placeholder="Name"
        fullWidth
        variant="outlined"
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
    </form>
  );
};

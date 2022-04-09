import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

import { useForm } from 'react-hook-form';
import { useStoreState, useStoreActions } from '../../../hooks';
import PlacesEntry from '../../../interfaces/PlacesEntry';

const Places = () => {
  const reverseEntries = useStoreState(state => state.place.reverseEntries);
  const getEntries = useStoreActions(state => state.place.getEntries);

  useEffect(() => {
    getEntries();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlacesEntry>({ defaultValues: { name: '', content: '' } });

  const createEntry = useStoreActions(state => state.place.createEntry);
  const onSubmit = (data: PlacesEntry) => {
    createEntry(data);
    reset(); // reset the form
  };

  return (
    <React.Fragment>
      {/*featuredPosts.map(post => (
        <CardActionArea key={post.title} sx={{ mb: 2 }} component='a' href='#'>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component='img'
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={post.image}
              alt={post.imageLabel}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component='h2' variant='h5'>
                {post.title}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {post.date}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {post.description}
              </Typography>
              <Typography variant='subtitle1' color='primary'>
                Continue reading...
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      ))*/}

      {reverseEntries.map(place => (
        <CardActionArea key={place.id} sx={{ mb: 2 }} component='a' href='#'>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component='img'
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={'https://picsum.photos/128/128'}
              alt={place.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component='h2' variant='h5'>
                {place.name}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {place.content}
              </Typography>
              <Typography variant='subtitle1' color='primary'>
                Continue reading...
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      ))}

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name', {
            required: 'This is required.',
            minLength: { value: 1, message: 'Name is too short.' }, // { value: 4, message: 'Name is too short.' },
            maxLength: { value: 80, message: 'Name is too long.' },
          })}
          error={!!errors.name?.message}
          helperText={errors.name ? errors.name.message : ''}
          placeholder='Name'
          fullWidth
          variant='outlined'
        />

        <TextField
          {...register('content', {
            required: 'This is required.',
            minLength: { value: 1, message: 'Content is too short.' }, // minLength: { value: 15, message: 'Content is too short.' },
            maxLength: { value: 200, message: 'Content is too long.' },
          })}
          error={!!errors.content?.message}
          helperText={errors.content ? errors.content.message : ''}
          placeholder='Content'
          fullWidth
          multiline
          rows={3}
          variant='outlined'
          margin={'normal'}
        />

        <Box display='flex' justifyContent='flex-end'>
          <Button type='submit' color='primary' variant='contained'>
            Add Entry
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Places;

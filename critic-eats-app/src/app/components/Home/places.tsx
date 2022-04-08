import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

const Places = () => {
  return (
    <React.Fragment>
      {featuredPosts.map(post => (
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
      ))}
    </React.Fragment>
  );
};

export default Places;

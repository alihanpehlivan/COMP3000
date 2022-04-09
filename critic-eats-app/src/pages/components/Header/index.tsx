import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Sections = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  //{ title: 'Culture', url: '#' },
  //{ title: 'Business', url: '#' },
  //{ title: 'Politics', url: '#' },
  //{ title: 'Opinion', url: '#' },
  //{ title: 'Science', url: '#' },
  //{ title: 'Health', url: '#' },
  //{ title: 'Style', url: '#' },
  //{ title: 'Travel', url: '#' },
];

interface IHeader {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

const index = (props: IHeader) => {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }} disableGutters>
        <Button to='/' component={RouterLink} size='small' variant='outlined'>
          Home
        </Button>
        <Button to='/about' component={RouterLink} size='small' variant='outlined'>
          About
        </Button>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
};

export default index;

import React from 'react';
import Typography from '@mui/material/Typography';

const FooterCopyright = (props: any) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {' CriticEats'}
    </Typography>
  );
};

export default FooterCopyright;

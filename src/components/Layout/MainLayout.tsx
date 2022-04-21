import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <React.Fragment>
      <Container>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          sx={{
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <FilterAltIcon />
            </IconButton>
          </Toolbar>

          <Toolbar
            sx={{ flexWrap: 'wrap', display: { xs: 'none', md: 'flex' } }}
          >
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              CriticEats
              <span aria-label="emoji" role="img">
                🍴
              </span>
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                About
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Support
              </Link>
            </nav>
            <Button
              component={RouterLink}
              to={'//auth/login'}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </Container>
    </React.Fragment>
  );
};

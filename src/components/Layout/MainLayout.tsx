import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link as RouterLink } from 'react-router-dom';

import { auth } from '@/providers/firebase';

import { Logo } from '../AppBar/Logo';
import { Menu } from '../AppBar/Menu';
import { MobileMenu } from '../AppBar/MobileMenu';
import { Search } from '../AppBar/Search';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [user, loading] = useAuthState(auth);

  return (
    <React.Fragment>
      <Container sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          sx={{
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
        >
          <Toolbar>
            <Logo />
            <Search />
            <Box sx={{ flexGrow: 1 }} />
            {/* When logged in */}
            {user && (
              <React.Fragment>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={0} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            )}
            {/* When logged out */}
            {!user && (
              <Box>
                <Button
                  component={RouterLink}
                  to={'//auth/login'}
                  variant="outlined"
                  sx={{ minWidth: 'max-content' }}
                >
                  Sign in
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <MobileMenu
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
        />
        <Menu
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
        />
        {children}
      </Container>
    </React.Fragment>
  );
};

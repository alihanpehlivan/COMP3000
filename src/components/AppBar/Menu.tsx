import { Menu as MenuComponent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { PopoverProps } from '@mui/material/Popover';
import { signOut } from 'firebase/auth';
import * as React from 'react';

import { auth } from '@/providers/firebase';

interface MenuProps {
  anchorEl: PopoverProps['anchorEl'];
  isMenuOpen: boolean;
  handleMenuClose: React.MouseEventHandler<HTMLElement>;
}

export const Menu = (props: MenuProps) => {
  return (
    <MenuComponent
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={props.isMenuOpen}
      onClose={props.handleMenuClose}
    >
      <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
      <MenuItem
        onClick={() => {
          signOut(auth);
          window.location.reload();
        }}
      >
        Sign out
      </MenuItem>
    </MenuComponent>
  );
};

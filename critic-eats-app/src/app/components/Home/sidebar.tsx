import React from 'react';

import SidebarCategory from './sidebar-category';
import SidebarLocation from './sidebar-location';

const Sidebar = () => {
  return (
    <React.Fragment>
      <SidebarLocation />
      <SidebarCategory />
    </React.Fragment>
  );
};

export default Sidebar;

import React from 'react';
import Hamburger from 'react-hamburgers';

const AppMobileMenu = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="AppMobileMenu">
      <Hamburger
        active={isSidebarOpen}
        type="elastic"
        onClick={() => toggleSidebar()}
      />
    </div>
  );
};

export default AppMobileMenu;

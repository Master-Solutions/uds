import React from 'react';
import Hamburger from 'react-hamburgers';

const MenuToggler = ({ isMenuOpen, toggleMenu, hamburgerType = 'elastic' }) => {
  return (
    <div className="MenuToggler">
      <Hamburger
        active={isMenuOpen}
        type={hamburgerType}
        onClick={() => toggleMenu()}
      />
    </div>
  );
};

export default MenuToggler;

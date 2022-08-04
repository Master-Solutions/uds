import React from 'react';
import { Slot } from 'react-slot-fill';

const AppLogo = () => (
  <div className="AppLogo">
    <Slot name="AppHeader.Logo" />
  </div>
);

export default AppLogo;

import React from 'react';
import withViewPort from "./withViewPort";

const Tracker = ({width, height, breakpoint}) => {
  return (
    <div>
      Width: {width}, Height: {height}, Breakpoint: {breakpoint}
    </div>
  )
};

export default withViewPort(Tracker);

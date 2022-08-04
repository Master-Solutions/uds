import React from 'react';
import ViewPortContext from './ViewPortContext';
import { withResizeDetector } from 'react-resize-detector';

// bootstrap 4 default breakpoints
const defaultBreakpoints = {
  xs: 0,   // all mobile devices
  sm: 576, // mobile devices (not sure which one's this big)
  md: 768, // ipad, ipad pro, ipad mini, etc
  lg: 992, // smaller laptops
  xl: 1200 // laptops and desktops
};

const sortBreakpoints = (breakpoints) => {
  return Object.keys(breakpoints)
  .map(k => [k, breakpoints[k]])
  .sort((a, b) => b[1] - a[1])
};

// breakpoints should be sorted
const calculateBreakpoint = (screenWidth, breakpoints) => {
  for (let b of breakpoints) {
    if (screenWidth >= b[1]) {
      return b[0]
    }
  }
  // screenWidth is below lowest breakpoint,
  // so it will still be set to equal lowest breakpoint instead of null
  return breakpoints[breakpoints.length - 1][0]
};

export const createViewPortProvider = (
  resizeDetectorProps = {handleWidth: true, handleHeight: true},
  breakpoints = defaultBreakpoints) => {

  const sortedBreakpoints = sortBreakpoints(breakpoints);

  const ViewPortProvider = ({children, width, height}) => {
    const breakpoint = calculateBreakpoint(width, sortedBreakpoints);
    return (
      <ViewPortContext.Provider value={{width, height, breakpoints, breakpoint}}>
        {children}
      </ViewPortContext.Provider>
    )
  };

  return withResizeDetector(ViewPortProvider, resizeDetectorProps);
};

export default createViewPortProvider();

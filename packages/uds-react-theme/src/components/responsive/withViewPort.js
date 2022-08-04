import React from 'react';
import ViewPortContext from './ViewPortContext';

const withViewPort = Component => props => {
  return (
    <ViewPortContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ViewPortContext.Consumer>
  )
};

export default withViewPort;

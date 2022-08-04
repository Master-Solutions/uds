import React from 'react';

const ShellLayoutMain = ({children}) => {
  return (
      <div className="shell-main__outer">
        <div className="shell-main__inner">
          {children}
        </div>
      </div>
  )
};

export default ShellLayoutMain;

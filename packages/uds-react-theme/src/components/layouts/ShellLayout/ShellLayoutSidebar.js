import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import cx from 'classnames';

const ShellLayoutSidebar = (props) => {
  const {
    children,
    backgroundColor,
    shadow,
  } = props;

  return (
    <div>
      <div className={cx(
        "shell-sidebar",
        backgroundColor,
        {'sidebar-shadow': shadow}
      )}>
      </div>
      <PerfectScrollbar>
        <div className="shell-sidebar__inner">
          {children}
        </div>
      </PerfectScrollbar>
    </div>
  )
};

export default ShellLayoutSidebar;

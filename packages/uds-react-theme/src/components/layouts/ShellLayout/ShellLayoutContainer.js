import React, {Component, Fragment} from 'react';
import cx from 'classnames';

import ShellLayoutHeader from "./ShellLayoutHeader";
import ShellLayoutMain from "./ShellLayoutMain";
import ShellLayoutMainContainer from "./ShellLayoutMainContainer";
import ShellLayoutSidebar from "./ShellLayoutSidebar";
import ViewPortProvider from "../../responsive/ViewPortProvider";
import ViewPortContext from "../../responsive/ViewPortContext";
import withViewPort from "../../responsive/withViewPort";

const ShellLayoutContainer = (props) => {
  const {
    // view port
    width,
    breakpoints,
    breakpoint,

    // header
    headerLeft,
    headerRight,
    headerFixed = true,
    headerBackgroundColor = '',
    headerShadow = true,

    //sidebar
    sidebar,
    sidebarFixed = false,
    sidebarClosed = false,
    sidebarBackgroundColor = '',
    sidebarShadow = true,

    // footer
    footerFixed = false,

    // main
    children,


  } = props;

    return (
        <div className={cx(
          "shell-container",
          {'fixed-header': headerFixed},
          {'fixed-sidebar': sidebarFixed || width < breakpoints.xl},
          {'fixed-footer': footerFixed},
          {'closed-sidebar': sidebarClosed || width < breakpoints.xl},
        )}>
          {children}
        </div>
    )

};

export default withViewPort(ShellLayoutContainer);

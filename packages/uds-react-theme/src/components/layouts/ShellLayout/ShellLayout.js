import React, {Component, Fragment} from 'react';
import cx from 'classnames';

import ShellLayoutHeader from "./ShellLayoutHeader";
import ShellLayoutMain from "./ShellLayoutMain";
import ShellLayoutMainContainer from "./ShellLayoutMainContainer";
import ShellLayoutSidebar from "./ShellLayoutSidebar";
import ViewPortProvider from "../../responsive/ViewPortProvider";
import ViewPortContext from "../../responsive/ViewPortContext";
import ShellLayoutContainer from "./ShellLayoutContainer";

const ShellLayout = (props) => {
  const {
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

    //sizing
    width,
    height,
  } = props;

    return (
      <ViewPortProvider>
        <ShellLayoutContainer>

          <ShellLayoutHeader
            left={headerLeft}
            right={headerRight}
            fixed={headerFixed}
            backgroundColor={headerBackgroundColor}
            shadow={headerShadow}
          />

          <ShellLayoutMainContainer>

            <ShellLayoutSidebar>
              {sidebar}
            </ShellLayoutSidebar>

            <ShellLayoutMain>
              {children}
            </ShellLayoutMain>

          </ShellLayoutMainContainer>

        </ShellLayoutContainer>
      </ViewPortProvider>
    )

};

export default ShellLayout;

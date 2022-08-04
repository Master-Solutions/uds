import React from 'react';
import cx from 'classnames';

const ShellLayoutHeader = (props) => {
  const {
    left,
    right,

    backgroundColor,
    shadow,

    enableMobileMenuSmall
  } = props;

  return (
    <div className={cx(
      "shell-header",
      backgroundColor,
      {'header-shadow': shadow}
    )}>
      <div className={cx(
        "shell-header__content",
        {'header-mobile-open': enableMobileMenuSmall},
      )}>
        {left && <div className="shell-header-left">{left}</div>}
        {right && <div className="shell-header-right">{right}</div>}
      </div>
    </div>
  )
};

export default ShellLayoutHeader;

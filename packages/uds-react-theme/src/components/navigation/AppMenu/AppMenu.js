import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ui-theme';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

const AppMenu = ({ onClick }) => (
  <div className="AppMenu">
    <Button
      size="sm"
      className={cx("btn-icon btn-icon-only", { active: true })}
      color="primary"
      onClick={onClick}
    >
      <div className="btn-icon-wrapper">
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </Button>
  </div>
);

export default AppMenu;

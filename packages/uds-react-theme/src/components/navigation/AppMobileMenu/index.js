import { connect } from 'react-redux';

import AppMobileMenu from './AppMobileMenu';
import { toggleSidebar, isSidebarOpenSelector } from 'ui-theme/src/reducers/theme-reducer';

const mapStateToProps = (state) => ({
  isSidebarOpen: isSidebarOpenSelector(state),
});

const mapDispatchToProps = {
  toggleSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMobileMenu);

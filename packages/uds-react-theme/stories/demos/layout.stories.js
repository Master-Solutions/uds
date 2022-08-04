import React from 'react';
import { storiesOf } from '@storybook/react';
import ShellLayout from "../../src/components/layouts/ShellLayout/index";
import MenuToggler from "../../src/components/navigation/MenuToggler/MenuToggler";
import Tracker from "../../src/components/responsive/Tracker";

storiesOf('Demos|Layout', module)

.add('ShellLayout', () => (
  <ShellLayout
    headerLeft={
      <React.Fragment>
        <MenuToggler />
        <span>HeaderLeft2</span>
      </React.Fragment>
    }
    headerRight={<span>HeaderRight</span>}
  >
    <div>
      <Tracker />
      <span>Test</span>
    </div>

  </ShellLayout>
));


import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import "./Toolbar.css";

interface ToolbarProps {
  drawerToggleClicked: () => void;
}
const Toolbar: React.SFC<ToolbarProps> = (props) => {
  return (
    <div>
      <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className="DesktopOnly">
          <NavigationItems />
        </nav>
      </header>
    </div>
  );
};

export default Toolbar;

import React, { ReactElement, Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import "./Layout.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

interface LayoutProps {
  children: ReactElement<any, any>;
}

interface LayoutState {
  showSideDrawer: boolean;
}

class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      showSideDrawer: true,
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="content">{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;

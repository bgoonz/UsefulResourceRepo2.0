import * as React from "react";
import { Router, useCurrentRoute, View } from "react-navi";
import SideMenu from "../../components/SideMenu";
import routes from "../../routes";
import { useAppState } from "../../services";
import Navbar from "./Navbar";

const css = {
  main: `bg-white p-4 grow mt-4`,
  side: `bg-white p-4 absolute right-0 w-48 shadow-md Xh-full rounded-bl`
};

export default () => {
  const { isSideMenuOpen } = useAppState();

  return (
    <Router routes={routes}>
      <RouterEffects />

      <Navbar />

      {isSideMenuOpen && (
        <div className={css.side}>
          <SideMenu />
        </div>
      )}

      <div data-test-id="main" className={css.main}>
        <View />
      </div>
    </Router>
  );
};

function RouterEffects() {
  const { closeSideMenu } = useAppState();
  const { pathname } = useCurrentRoute().url;

  React.useEffect(() => {
    closeSideMenu();
  }, [pathname]);

  return null;
}

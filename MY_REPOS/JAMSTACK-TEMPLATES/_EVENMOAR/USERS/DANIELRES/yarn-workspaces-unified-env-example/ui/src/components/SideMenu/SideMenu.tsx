import * as React from "react";
import { Link } from "react-navi";
import { useAppState, useAuth } from "../../services";
import Spaces from "./Spaces";

const css = {
  title: `text-sm text-gray-600 mb-2`,
  buttons: {
    logout: `bg-gray-300 w-full text-left py-2 px-4 rounded text-sm font-semibold text-gray-700 hover:bg-gray-500 hover:text-white`
  },
  links: {
    outer: `mb-2`,
    item: `no-underline block mb-2 text-blue-700 font-semibold text-sm`
  }
};

export default () => {
  const { sideMenuContent, user } = useAppState();
  const { logout } = useAuth();
  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  if (sideMenuContent === "spaces")
    return (
      <section>
        <h2 className={css.title}>Spaces</h2>
        <Spaces />
      </section>
    );

  if (sideMenuContent === "user")
    return (
      <section>
        <h2 className={css.title}>{user.email}</h2>

        <div className={css.links.outer}>
          <Link
            className={css.links.item}
            data-test-id="button-profile"
            href="/profile"
          >
            Profile
          </Link>
        </div>

        <button
          className={css.buttons.logout}
          data-test-id="button-logout"
          onClick={logoutWithRedirect}
        >
          Logout
        </button>
      </section>
    );

  return null;
};

import * as React from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-navi";
import { useAppState } from "../../services";

const css = {
  outer: `py-2 bg-blue-700 text-white`,
  inner: `flex justify-between items-center px-4 `,
  left: { outer: ``, item: `mr-4` },
  right: { outer: `flex`, item: `ml-2` },
  links: { brand: `no-underline text-blue-300 hover:text-blue-100 ml-2` },
  Avatar: {
    img: `rounded-full border-4 border-blue-600 hover:border-blue-400`
  },
  icon: `text-blue-300 hover:text-blue-100 align-middle`,
  button: `outline-none`
};

export default () => {
  const { user } = useAppState();
  const { toggleSideMenu } = useAppState();

  return (
    <div className={css.outer}>
      <div className={css.inner}>
        <div className={css.left.outer}>
          <div className={css.left.item}>
            <Link className={css.links.brand} href="/">
              Hola
            </Link>
          </div>
        </div>

        <div className={css.right.outer}>
          <React.Fragment>
            <button
              className={css.button}
              data-test-id="button-sidemenu-spaces"
              onClick={() => toggleSideMenu("spaces")}
            >
              <FaCog className={css.icon} />
            </button>

            <button
              className={css.button}
              onClick={() => toggleSideMenu("user")}
              data-test-id="button-sidemenu-user"
            >
              <Avatar className={css.right.item} user={user} />
            </button>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

function Avatar({ className, user }) {
  return (
    <div className={className}>
      <img
        alt="User picture"
        className={css.Avatar.img}
        height={40}
        src={user.picture}
        width={40}
      />
    </div>
  );
}

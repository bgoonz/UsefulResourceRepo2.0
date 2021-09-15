import * as React from "react";
import { Link, useActive } from "react-navi";
import { useAppState } from "../../../services";

const linkBase = `block px-2 py-1 mb-2 rounded font-semibold no-underline`;
const css = {
  item: `text-sm`,
  links: {
    normal: `${linkBase} bg-blue-200 text-blue-700 hover:bg-blue-700 hover:text-white`,
    active: `${linkBase} bg-blue-700 text-white`
  }
};

export default () => {
  const { user } = useAppState();

  return (
    <ul>
      {user.spaces.map(({ name, shortId }, i) => {
        const href = `/${shortId}`;
        return (
          <li className={css.item} key={shortId}>
            <Link
              href={href}
              className={useActive(href) ? css.links.active : css.links.normal}
              data-test-id={`button-space-${i + 1}`}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

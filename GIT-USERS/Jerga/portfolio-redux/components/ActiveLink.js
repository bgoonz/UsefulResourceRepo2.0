import { withRouter } from "next/router";
// import Link from 'next/link';
import React, { Children } from "react";
import { Link } from "../routes";

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);

  let className = child.props.className || "";
  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);

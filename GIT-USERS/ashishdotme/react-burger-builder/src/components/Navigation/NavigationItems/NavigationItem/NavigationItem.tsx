import React from "react";
import "./NavigationItem.css";

interface NavigationItemProps {
  active: boolean;
  link: string;
}

const NavigationItem: React.SFC<NavigationItemProps> = (props) => {
  return (
    <li className="NavigationItem">
      <a href={props.link} className={props.active ? "active" : ""}>
        {props.children}
      </a>
    </li>
  );
};

export default NavigationItem;

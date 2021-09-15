import React from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className }) {
  const { toggleTheme } = useTheme();

  return (
    <Toggle
      onChange={toggleTheme}
      className={`day-night-toggle ${className}`}
      icons={{
        checked: <FontAwesomeIcon inverse icon="sun" />,
        unchecked: <FontAwesomeIcon inverse icon="moon" />,
      }}
    />
  );
}

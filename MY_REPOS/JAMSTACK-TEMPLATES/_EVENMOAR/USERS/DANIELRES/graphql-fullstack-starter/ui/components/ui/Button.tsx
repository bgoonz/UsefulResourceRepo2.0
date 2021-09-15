import classnames from "classnames";
import React from "react";

const css = {
  base: "py-2 px-4 rounded inline-block",
  primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold",
};

interface IProps {
  as?: "button" | "a";
  className?: string;
  children: JSX.Element | string;
  primary?: boolean;
  submit?: boolean;
}

export default function Button({
  as: customTag = "button",
  className,
  children,
  primary,
  submit,
  ...rest
}: IProps): JSX.Element {
  const props = {
    className: classnames(className, css.base, {
      [css.primary]: primary,
    }),
    ...(submit && { type: "submit" }),
    ...rest,
  };

  return React.createElement(customTag, props, children);
}

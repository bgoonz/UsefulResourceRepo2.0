import classnames from "classnames";
import React from "react";

const variants = {
  danger: "bg-red-200 text-red-900",
  info: "bg-blue-200 text-blue-900",
  success: "bg-green-200 text-green-900",
};

interface IProps {
  children: JSX.Element | string;
  type: "danger" | "info" | "success";
  className?: string;
  dismiss?: () => void;
}

export default function Alert({
  children,
  className,
  dismiss,
  type = "info",
}: IProps): JSX.Element {
  return (
    <div
      className={classnames(
        "relative px-4 py-2 rounded",
        className,
        variants[type]
      )}
    >
      {dismiss && (
        <button
          aria-label="dismiss"
          className="absolute top-0 right-0 leading-none mr-1 text-xl font-bold opacity-25 hover:opacity-100"
          onClick={dismiss}
          title="dismiss"
          type="button"
        >
          ×
        </button>
      )}
      {children}
    </div>
  );
}

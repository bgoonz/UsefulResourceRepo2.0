import React from "react";
import Icon from "./icons/Person";
import classnames from "classnames";

export default ({ size = 64, src }) => {
  if (src)
    return (
      <img
        alt="User portrait"
        className={classnames(`w-${size}`, `h-${size}`, "rounded-full")}
        src={src}
      />
    );

  return (
    <div
      title="Picture missing"
      className={classnames(
        `w-${size}`,
        `h-${size}`,
        "rounded-full",
        "flex items-center justify-center",
        "bg-gray-100 border-solid border-2 border-gray-200"
      )}
    >
      <Icon className="w-2/3 h-2/3 text-gray-500" />
    </div>
  );
};

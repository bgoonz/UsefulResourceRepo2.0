import classnames from "classnames";
import React, { useEffect, useState } from "react";

interface IProps {
  center?: boolean;
}

export default function Spinner({ center }: IProps): JSX.Element {
  const [opacityClass, setOpacityClass] = useState("opacity-0");

  useEffect(() => {
    setTimeout(() => setOpacityClass("opacity-100"), 400);
  }, []);

  return (
    <div className={classnames({ "mt-32 text-center": center })}>
      <div
        className={classnames(
          opacityClass,
          "transition duration-1000",
          "inline-block",
          "loader ease-linear rounded-full border-b-2 border-l-2 h-12 w-12 border-gray-400"
        )}
      />
      <style jsx>
        {`
          .loader {
            -webkit-animation: spinner 1s linear infinite;
            animation: spinner 1s linear infinite;
          }

          @-webkit-keyframes spinner {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }

          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

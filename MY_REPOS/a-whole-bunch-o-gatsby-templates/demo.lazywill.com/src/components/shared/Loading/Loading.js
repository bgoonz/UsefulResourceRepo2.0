import React from "react";
import { CircularProgress } from "material-ui/Progress";
import SvgEl from "../SvgEl";
import LOGOS from "../../../constants/logos";

const Loading = props => {
  const { error } = props;

  if (error) {
    return (
      <div
        style={{
          color: "#ffffff",
          maxWidth: "300px",
          width: "80%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <p>Seems that there is a problem.</p>
        <p>We cannot connect with the server to load the data.</p>
        <p>Please check your Internet connection. If it{`'`}s not the cause please try later.</p>
        <p>I am sorry for the inconvenience.</p>
        <p>
          lazy <b>Will</b>
          <span
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              width: "30px",
              height: "30px",
              margin: "0 0 0 10px"
            }}
          >
            <SvgEl svg={LOGOS.AVATAR} />
          </span>
        </p>
      </div>
    );
  } else {
    return (
      <CircularProgress
        thickness={4}
        size={60}
        style={{
          color: "#709425",
          position: "absolute",
          top: "50%",
          left: "50%",
          margin: "-30px 0 0 -30px"
        }}
      />
    );
  }
};

export default Loading;

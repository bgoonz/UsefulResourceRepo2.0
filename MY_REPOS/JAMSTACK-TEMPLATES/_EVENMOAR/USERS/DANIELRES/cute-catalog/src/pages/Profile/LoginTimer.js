import React from "react";
import Cookies from "js-cookie";

const Timer = ({ timestamp }) => {
  const date = new Date(parseInt(timestamp));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <>
      {hours}:{minutes}:{seconds}
    </>
  );
};

export default () => {
  const authExpiresAt = Cookies.get("authExpiresAt");

  return authExpiresAt ? (
    <>
      Signed in until: <Timer timestamp={authExpiresAt} />{" "}
    </>
  ) : (
    "Not signed in"
  );
};

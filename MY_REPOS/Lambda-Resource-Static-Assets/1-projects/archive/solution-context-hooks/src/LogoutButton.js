import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import PokemonContext from "./PokemonContext";

const LogoutButton = () => {
  const { token, setToken } = useContext(PokemonContext);
  const handleClick = () => {
    window.localStorage.setItem("token", "");
    setToken("");
  };

  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default LogoutButton;

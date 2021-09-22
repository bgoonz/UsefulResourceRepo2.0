import React from 'react';
import { Redirect } from 'react-router-dom';

const LogoutButton = ({token, setToken}) => {
  const handleClick = () => {
    window.localStorage.setItem("token", "");
    setToken('');
  }

  if (!token) {
    return <Redirect to="/login"/>
  }
  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default LogoutButton;

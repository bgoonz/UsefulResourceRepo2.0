import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from './fetches/authentication';
import PokemonContext from './PokemonContext';

const LoginPanel = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const {token, setToken} = useContext(PokemonContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken(email, password);
    setToken(token);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (token) {
    return <Redirect to="/"/>;
  }
  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPanel;
import React, { useState } from "react";
import "./style.css";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useState(initialState);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = () => {
    setUser(form);
    setForm(initialState);
  };

  return (
    <>
      <div class="form">
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleOnChange(e)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleOnChange(e)}
        />
        <br />
        <br />
        <button onClick={handleOnSubmit} type="submit">
          Submit
        </button>
        <br />
        <br />
        {user.username && JSON.stringify(user, null, 2)}
      </div>
    </>
  );
};

export default Login;

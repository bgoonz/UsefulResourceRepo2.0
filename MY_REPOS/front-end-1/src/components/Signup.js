// function LoginSignup(){
//     return "Please Replace Me";
// }

// export default LoginSignup;
import React, {useState} from 'react';
const Signup = () => {
  const [formData, setFormData] = useState ({
    userName: '',
    password: '',
  });
  const updateFormData = event =>
    setFormData ({
      ...formData,
      [event.target.name]: event.target.value,
    });
  const {userName, password} = formData;

  const onSubmit = evt => {
    evt.preventDefault ();
    // console.log("FormData:",formData);
//     const loginCreds = {
//       username: formData.username.trim (),
//       password: formData.password.trim (),
//     };
    // console.log("LoginCreds:",loginCreds);
    // props.loginUser (loginCreds);
  };

  return (
    <form>
      <input
        value={userName}
        onChange={e => updateFormData (e)}
        placeholder="User Name"
        type="text"
        name="userName"
        required
      />
      <input
        value={password}
        onChange={e => updateFormData (e)}
        placeholder="Password"
        type="password"
        name="password"
        required
      />
      <button onClick={onSubmit} type="submit">Submit</button>
    </form>
  );
};
export default Signup;

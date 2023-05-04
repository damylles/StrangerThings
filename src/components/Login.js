import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COHORT_NAME = '2301-ftb-pt-web-pt';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/users/login`;

const Login = ({ setAuthentication }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      user: {
        username: username,
        password: password,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    const result = await fetch(BASE_URL, options);
    const response = await result.json();
    if (response.success) {
      console.log(response);
      setAuthentication({ token: response.data.token, isLoggedIn: true });
      navigate('/');
    } else {
      const error = response.error;
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <div className="main">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputwrapper">
            <label htmlFor="name" className="newline">
              User
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="User"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <label htmlFor="pasword" className="newline">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="mybutton" />
          <input
            type="submit"
            value="Create Account"
            className="createaccount"
            onClick={(e) => {
              navigate('/createaccount');
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Login;

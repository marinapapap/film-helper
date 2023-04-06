import React, { useState } from "react";
import "../../App.css";

interface LoginFormProps {
  navigate: Function;
}

export const LoginForm: React.FC<LoginFormProps> = ({ navigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (setFunction: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let response = await fetch("/tokens/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status !== 201) {
    } else {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/film");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div id="login-email-container">
          <label htmlFor="login-email">Email:</label>
          <br />
          <input
            id="login-email"
            name="login-email"
            data-cy="login-email"
            type="text"
            required
            value={email}
            onChange={handleChange(setEmail)}
          />
        </div>
        <div id="login-password-container">
          <label htmlFor="login-password">Password:</label>
          <br />
          <input
            id="login-password"
            name="login-password"
            data-cy="login-password"
            type="password"
            required
            value={password}
            onChange={handleChange(setPassword)}
          />
        </div>
        <div>
          <input
            id="login-submit"
            data-cy="login-submit"
            type="submit"
            value="submit"
          />
        </div>
      </form>
    </div>
  );
};

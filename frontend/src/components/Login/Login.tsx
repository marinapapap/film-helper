import React, { useState, useEffect } from "react";
import "./Login.css";
const baseUrl = process.env.REACT_APP_API_URL;

interface LoginFormProps {
  navigate: Function;
}

export const LoginForm: React.FC<LoginFormProps> = ({ navigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [renderError, setRenderError] = useState<boolean>(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/tokens/validate`, {
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.session) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    validateToken();
  }, [navigate]);

  const handleChange = (setFunction: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
      setRenderError(false);
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/tokens/login`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.status !== 201) {
        setRenderError(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderErrorMessage = () => {
    if (renderError) {
      return <div className="error-message">Invalid user details</div>;
    }
    return null;
  };

  return (
    <div className="App">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div id="login-email-container">
            <input
              id="login-email"
              className="login-input"
              name="login-email"
              data-cy="login-email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={handleChange(setEmail)}
            />
          </div>
          <div id="login-password-container">
            <br />
            <input
              id="login-password"
              className="login-input"
              name="login-password"
              data-cy="login-password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handleChange(setPassword)}
            />
          </div>
          {renderErrorMessage()}
          <div>
            <input
              id="login-submit"
              data-cy="login-submit"
              type="submit"
              value="submit"
            />
          </div>
        </form>
        <div id="signup-link">
          <p>
            Need an account? Signup <a href="/signup">here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

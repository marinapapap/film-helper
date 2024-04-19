import React, { useState, useEffect } from "react";
import "./Signup.css";
const baseUrl = process.env.REACT_APP_API_URL;

interface SignupFormProps {
  navigate: Function;
}

export const SignupForm: React.FC<SignupFormProps> = ({ navigate }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
        console.log(error);
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
      const response = await fetch(`${baseUrl}/users`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.status !== 201) {
        const data = await response.json();
        setRenderError(true);
        handleErrorMessage(data.message);
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleErrorMessage = (message: any) => {
    switch (typeof message) {
      case "string":
        setErrorMessage(message);
        break;
      default:
        setErrorMessage("Invalid user details");
    }
  };

  const passwordMatchMessage = () => {
    if (password !== confirmPassword) {
      return <div className="error-message">The passwords do not match</div>;
    }
    return null;
  };

  const renderErrorMessage = () => {
    if (renderError) {
      return (
        <>
          <div className="error-message">{errorMessage}</div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div id="signup-username-container">
            <input
              id="signup-username"
              className="signup-input"
              name="signup-username"
              data-cy="signup-username"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={handleChange(setUsername)}
            />
          </div>
          <div id="signup-email-container">
            <input
              id="signup-email"
              className="signup-input"
              name="signup-email"
              data-cy="signup-email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={handleChange(setEmail)}
            />
          </div>
          <div id="signup-password-container">
            <input
              id="signup-password"
              className="signup-input"
              name="signup-password"
              data-cy="signup-password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handleChange(setPassword)}
            />
          </div>
          <div id="confirm-password-container">
            <input
              id="confirm-signup-password"
              className="signup-input"
              name="signup-password"
              data-cy="signup-password"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
            />
          </div>
          {passwordMatchMessage()}
          {renderErrorMessage()}
          <div>
            <input
              id="signup-submit"
              data-cy="signup-submit"
              type="submit"
              value="submit"
            />
          </div>
        </form>
        <div id="login-link">
          <p>
            Already have an account? <br /> Login <a href="/login">here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

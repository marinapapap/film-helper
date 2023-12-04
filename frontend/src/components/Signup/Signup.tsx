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
  }, []);

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
        setRenderError(true);
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
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
      return <div className="error-message">Invalid user details</div>;
    }
    return null;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div id="signup-username-container">
          <label htmlFor="signup-username">Username:</label>
          <br />
          <input
            id="signup-username"
            name="signup-username"
            data-cy="signup-username"
            type="text"
            required
            value={username}
            onChange={handleChange(setUsername)}
          />
        </div>
        <div id="signup-email-container">
          <label htmlFor="signup-email">Email:</label>
          <br />
          <input
            id="signup-email"
            name="signup-email"
            data-cy="signup-email"
            type="text"
            required
            value={email}
            onChange={handleChange(setEmail)}
          />
        </div>
        <div id="signup-password-container">
          <label htmlFor="signup-password">Password:</label>
          <br />
          <input
            id="signup-password"
            name="signup-password"
            data-cy="signup-password"
            type="password"
            required
            value={password}
            onChange={handleChange(setPassword)}
          />
        </div>
        <div id="confirm-password-container">
          <label htmlFor="signup-password">Confirm your password:</label>
          <br />
          <input
            id="confirm-signup-password"
            name="signup-password"
            data-cy="signup-password"
            type="password"
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
      <p>
        Already have an account? Login <a href="/login">here</a>
      </p>
    </div>
  );
};

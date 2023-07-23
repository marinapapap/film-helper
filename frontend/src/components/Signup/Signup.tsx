import React, { useState, useEffect } from "react";
import "../../App.css";

interface SignupFormProps {
  navigate: Function;
}

export const SignupForm: React.FC<SignupFormProps> = ({ navigate }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch("/tokens/validate");
        const responseData = await response.json();
        if (responseData.session) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    validateToken();
  }, []);

  const handleChange = (setFunction: Function) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/users", {
        method: "post",
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
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
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

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RandomFilm } from "./components/RandomFilm/RandomFilm";
import { LoginForm } from "./components/Auth/Login";
import { SignupForm } from "./components/Signup/Signup";

const App = () => {
  const [globalSession, setGlobalSession] = useState<boolean>(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RandomFilm
            navigate={useNavigate()}
            setGlobalSession={setGlobalSession}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginForm
            navigate={useNavigate()}
            setGlobalSession={setGlobalSession}
          />
        }
      />
      <Route path="/signup" element={<SignupForm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RandomFilm } from "./components/RandomFilm/RandomFilm";
import { LoginForm } from "./components/Login/Login";
import { SignupForm } from "./components/Signup/Signup";
import { SavedFilms } from "./components/SavedFilms/SavedFilms";
import "./App.css";

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
      <Route
        path="/savedFilms"
        element={
          <SavedFilms
            navigate={useNavigate()}
            setGlobalSession={setGlobalSession}
          />
        }
      />
    </Routes>
  );
};

export default App;

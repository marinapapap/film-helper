import { Routes, Route, useNavigate } from "react-router-dom";
import { RandomFilm } from "./components/RandomFilm/RandomFilm";
import { LoginForm } from "./components/Login/Login";
import { SignupForm } from "./components/Signup/Signup";
import { SavedFilms } from "./components/SavedFilms/SavedFilms";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RandomFilm navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignupForm navigate={useNavigate()} />} />
      <Route
        path="/savedFilms"
        element={<SavedFilms navigate={useNavigate()} />}
      />
    </Routes>
  );
};

export default App;

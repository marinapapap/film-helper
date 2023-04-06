import { Routes, Route, useNavigate } from "react-router-dom";
import { RandomFilm } from "./components/RandomFilm/RandomFilm";
import { LoginForm } from "./components/Auth/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/film" element={<RandomFilm navigate={useNavigate()} />} />
      <Route path="/" element={<LoginForm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

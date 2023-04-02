import { Routes, Route, useNavigate } from "react-router-dom";
import RandomFilm from "./components/RandomFilm/RandomFilm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RandomFilm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

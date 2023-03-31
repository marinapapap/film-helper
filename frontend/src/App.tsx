import { Routes, Route, useNavigate } from "react-router-dom";
import RandomFilm from "./components/RandomFilm/RandomFilm";

// import logo from "./logo.svg";
// import "./App.css";

// interface SetupData {
//   message: string;
// }

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RandomFilm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

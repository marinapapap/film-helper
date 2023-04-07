import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RandomFilm } from "./components/RandomFilm/RandomFilm";
import { LoginForm } from "./components/Auth/Login";

const App = () => {
  const [globalSession, setGlobalSession] = useState<boolean>(false);
  return (
    <Routes>
      <Route
        path="/film"
        element={
          <RandomFilm
            navigate={useNavigate()}
            setGlobalSession={setGlobalSession}
          />
        }
      />
      <Route path="/" element={<LoginForm navigate={useNavigate()} />} />
    </Routes>
  );
};

export default App;

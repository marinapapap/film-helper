import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface SetupData {
  message: string;
}

function App() {
  const [phrase, setPhrase] = useState<string>("");

  useEffect(() => {
    fetch("/setup")
      .then((response) => {
        console.log(response);
        return response.json() as Promise<SetupData>;
      })
      .then(async (data) => {
        console.log(data.message);
        setPhrase(data.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Phrase: {phrase} </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

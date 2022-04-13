import logo from "./logo.svg";
import "./App.css";
import Cam from "./Cam.js";
import Code from "./Code.js";
import Clues from "./Clues.js";
import { React, useState, useEffect, useRef } from "react";

function App() {
  const [progress, setProgress] = useState(1);

  return (
    <>
      {progress === 0 && <Code setProgress={setProgress} />}
      {progress === 1 && <Cam setProgress={setProgress} />}
      {progress === 2 && <Clues setProgress={setProgress} />}
    </>
  );
}

export default App;

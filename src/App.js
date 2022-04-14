import "./App.css";
import Splash from "./Splash.js";
import Cam from "./Cam.js";
import Code from "./Code.js";
import Clues from "./Clues.js";
import { React, useState, useEffect, useRef } from "react";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      {progress === 0 && (
        <Splash progress={progress} setProgress={setProgress} />
      )}
      {progress === 1 && <Code setProgress={setProgress} />}
      {progress === 2 && <Cam setProgress={setProgress} />}
      {progress === 3 && <Clues setProgress={setProgress} />}
    </>
  );
}

export default App;

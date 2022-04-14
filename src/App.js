import "./App.css";
import Splash from "./Splash.js";
import Cam from "./Cam.js";
import Code from "./Code.js";
import Clues from "./Clues.js";
import { React, useState, useEffect, useRef } from "react";

function App() {
  let messages = [
    "You got it!",
    "Yaaaaaaaaaaaaay!!!",
    "EGGcellent!",
    "Are you bored yet?",
    "BUURP!",
    "POOPALICIOUS!",
    "Good Job!",
    "Correct!",
    "YOU WIN 100 CHOCOLATE!",
  ];

  const [progress, setProgress] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    console.log("correct");
    setTimeout(() => {
      setCorrect(false);
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 6000);
  }, [correct]);

  return (
    <>
      {progress === 0 && (
        <Splash progress={progress} setProgress={setProgress} />
      )}
      {progress === 1 && (
        <Code setCorrect={setCorrect} setProgress={setProgress} />
      )}
      {progress === 2 && (
        <Cam setCorrect={setCorrect} setProgress={setProgress} />
      )}
      {progress === 3 && <Clues setProgress={setProgress} />}
      {correct && (
        <div id="correct" className="screen">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}

export default App;

import { React, useState, useEffect, useRef } from "react";
import "./Code.css";

function Code(props) {
  const [key1, setKey1] = useState();
  const [key2, setKey2] = useState();
  const [key3, setKey3] = useState();
  const [key4, setKey4] = useState();

  const [error, setError] = useState();

  useEffect(() => {
    document.getElementById("key1").focus();
  }, []);

  useEffect(() => {
    console.log("validate...");
    if (key1 === "6" && key2 === "7" && key3 === "8" && key4 === "9") {
      console.log("correct");
      setTimeout(() => {
        // setError(false);
        props.setCorrect(true);
        props.setProgress(2);
      }, 500);
    } else {
      if (key1 && key2 && key3) {
        setError(true);
      }
      setTimeout(() => {
        setKey1("");
        setKey2("");
        setKey3("");
        setKey4("");
        document.getElementById("key1").focus();
        setError(false);
      }, 500);
    }
  }, [key4]);

  var className = error ? "screen error" : "screen";

  return (
    <div id="code" className={className}>
      <div>
        <h2>Enter the passcode</h2>
        <input
          id="key1"
          type="text"
          onChange={(e) => {
            setKey1(e.target.value);
            document.getElementById("key2").focus();
          }}
          value={key1}
        />
        <input
          id="key2"
          type="text"
          value={key2}
          onChange={(e) => {
            setKey2(e.target.value);
            document.getElementById("key3").focus();
          }}
        />
        <input
          id="key3"
          type="text"
          value={key3}
          onChange={(e) => {
            setKey3(e.target.value);
            document.getElementById("key4").focus();
          }}
        />
        <input
          id="key4"
          type="text"
          value={key4}
          onChange={(e) => {
            setKey4(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Code;

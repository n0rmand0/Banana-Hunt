import { React, useState, useEffect, useRef } from "react";
import "./Code.css";

function Code(props) {
  const [key1, setKey1] = useState();
  const [key2, setKey2] = useState();
  const [key3, setKey3] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    document.getElementById("key1").focus();
  }, []);

  useEffect(() => {
    console.log("validate...", key1, key2, key3);
    if (key1 === "1" && key2 === "2" && key3 === "3") {
      console.log("correct");
      props.setProgress(2);
    } else {
      if (key1 && key2 && key3) {
        setError(true);
      }
      setTimeout(() => {
        setKey1("");
        setKey2("");
        setKey3("");
        document.getElementById("key1").focus();
        setError(false);
      }, 500);
    }
  }, [key3]);

  var className = error ? "screen error" : "screen";

  return (
    <div id="code" className={className}>
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
        }}
      />
    </div>
  );
}

export default Code;

// import logo from "./logo.svg";
import "./Clues.css";
// import { React, useState, useEffect, useRef } from "react";

function Clues(props) {
  return (
    <div id="clues" className="screen">
      <div>
        <div className="clue">
          <img src="/img1.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img2.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img3.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img4.jpg"></img>
        </div>
      </div>
      <div>
        <div className="clue">
          <img src="/img5.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img6.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img7.jpg"></img>
        </div>
        <div className="clue">
          <img src="/img8.jpg"></img>
        </div>
      </div>
    </div>
  );
}

export default Clues;

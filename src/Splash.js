// import logo from "./logo.svg";
import { React, useState, useEffect, useRef } from "react";

function Splash(props) {
  return (
    <div id="splash" className="screen" onClick={() => props.setProgress(1)}>
      <h1>Bannana Hunt</h1>
    </div>
  );
}

export default Splash;

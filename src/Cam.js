import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { React, useState, useEffect, useRef } from "react";
import "./Cam.css";

function Cam(props) {
  let items = ["banana", "cell phone"];
  // let items = ["person"];
  let progress = 0;

  const [model, setModel] = useState();
  const [loaded, setLoaded] = useState();
  const [item, setItem] = useState(items[0]);

  async function loadModel() {
    console.log("loading...");
    try {
      const model = await cocoSsd.load();
      setModel(model);
      console.log("set loaded Model");
    } catch (err) {
      console.log(err);
      console.log("failed load model");
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  useEffect(() => {
    if (model) {
      document.getElementById("img").onloadeddata = (event) => {
        startPrediction(item);
        setLoaded(true);
        console.log("Video loaded.");
      };
    }
  }, [model]);

  // useEffect(() => {
  //   item && startPrediction(item);
  // }, [item]);

  function next() {
    props.setCorrect(true);
    progress++;
    if (progress === items.length) {
      props.setCorrect(true);
      // go to next challenge
      props.setProgress(3);
    } else {
      setTimeout(() => {
        // setProgress(next);
        setItem(items[progress]);
      }, 4000);
    }
  }

  // // Webcam:
  const webcamRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);
  const videoConstraints = {
    height: 1080,
    width: 1920,
    facingMode: "user",
  };

  // prediction
  async function startPrediction(curItem) {
    console.log("Looking for ", items[progress], "...", progress);

    var cnvs = document.getElementById("myCanvas");
    // console.log(cnvs, model);

    if (cnvs && model) {
      // ensure canvas and webcam are loaded
      var ctx = cnvs.getContext("2d");
      //Clear the canvas for each prediction
      ctx.clearRect(
        0,
        0,
        webcamRef.current.video.videoWidth,
        webcamRef.current.video.videoHeight
      );

      //Start prediction
      const predictions = await model.detect(document.getElementById("img"));
      if (predictions.length > 0) {
        // console.log(predictions);
        predictions.map((p) => {
          if (p.score > 0.8) {
            //Threshold is 0.8 or 80%
            console.log("detected", p.class);

            if (p.class && items[progress] === p.class) {
              console.log("Found", p.class);
              //Extracting the coordinate and the bounding box information
              // let bboxLeft = p.bbox[0];
              // let bboxTop = p.bbox[1];
              // let bboxWidth = p.bbox[2];
              // let bboxHeight = p.bbox[3] - bboxTop;
              // //Drawing begin
              // ctx.beginPath();
              // ctx.font = "28px Arial";
              // ctx.fillStyle = "#FF00FF";
              // ctx.fillText(
              //   p.class + ": " + Math.round(parseFloat(p.score) * 100) + "%",
              //   bboxLeft,
              //   bboxTop
              // );
              // ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
              // ctx.strokeStyle = "#FF00FF";
              // ctx.lineWidth = 6;
              // ctx.stroke();

              next();
            }
          }
        });
      }
    }
    //Rerun prediction by timeout
    setTimeout(function () {
      startPrediction(item);
    }, 2000);
  }

  let loader = (
    <div id="cam-loader" className="screen">
      <h1>Loading...</h1>
    </div>
  );
  let cam = (
    <div id="cam" className="screen">
      <span className="cam__message">
        {progress + 1}. Show me a {item}
      </span>
      <div className="cam__vid">
        <Webcam
          audio={false}
          id="img"
          ref={webcamRef}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="cam__canvas">
        <canvas
          id="myCanvas"
          width={videoWidth}
          height={videoHeight}
          style={{ backgroundColor: "transparent" }}
        />
      </div>
      <div className="cam__img"></div>
    </div>
  );
  return (
    <>
      {cam}
      {!loaded && loader}
    </>
  );
}

export default Cam;

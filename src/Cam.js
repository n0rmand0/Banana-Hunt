import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { React, useState, useEffect, useRef } from "react";

function Cam(props) {
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [correct, setCorrect] = useState();

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
      console.log(model);
      setLoading(false);

      startPrediction();
    }
  }, [model]);

  // // Webcam:
  const webcamRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(960);
  const [videoHeight, setVideoHeight] = useState(640);
  const videoConstraints = {
    height: 1080,
    width: 1920,
    facingMode: "environment",
  };

  let progress = 0;
  let items = ["cell phone"];

  // prediction
  async function startPrediction() {
    console.log("predicting...");
    setMessage("Show me a " + items[progress]);

    var cnvs = document.getElementById("myCanvas");
    if (cnvs) {
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
            console.log("detected", p.class);

            //Threshold is 0.8 or 80%
            if (p.class && items[progress] === p.class) {
              console.log("Found", p.class);
              drawPrediction(p);
              flashCorrect();
              setMessage("Show me a " + items[progress]);
            }
          }
        });
      }
    }
    //Rerun prediction by timeout
    setTimeout(() => startPrediction(), 2000);

    function drawPrediction(p) {
      //Extracting the coordinate and the bounding box information
      let bboxLeft = p.bbox[0];
      let bboxTop = p.bbox[1];
      let bboxWidth = p.bbox[2];
      let bboxHeight = p.bbox[3] - bboxTop;
      // console.log("bboxLeft: " + bboxLeft);
      // console.log("bboxTop: " + bboxTop);
      // console.log("bboxWidth: " + bboxWidth);
      // console.log("bboxHeight: " + bboxHeight);
      //Drawing begin
      ctx.beginPath();
      ctx.font = "28px Arial";
      ctx.fillStyle = "#FF00FF";
      ctx.fillText(
        p.class + ": " + Math.round(parseFloat(p.score) * 100) + "%",
        bboxLeft,
        bboxTop
      );
      ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
      ctx.strokeStyle = "#FF00FF";
      ctx.lineWidth = 6;
      ctx.stroke();
    }
  }

  function flashCorrect() {
    setCorrect(true);
    setTimeout(() => {
      setCorrect(false);
      progress++;
      if (progress === items.length) {
        // go to next challenge
        props.setProgress(2);
      }
    }, 8000);
  }

  let loader = <div className="screen screen--loader">Loading...</div>;
  let cam = (
    <div className="screen screen--cam">
      <div className="cam">
        {correct && <div className="cam__correct">You got it!</div>}
        <span className="cam__message">
          {progress + 1}. {message}
        </span>
        <div className="cam__img">
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
      </div>
    </div>
  );
  return <>{loading ? loader : cam}</>;
}

export default Cam;

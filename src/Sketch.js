import React from 'react';
import Konva from 'konva';
import {
  Stage,
  Layer
} from 'react-konva';
import "./Sketch.css"

class Sketch extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;

    this.stageEl = React.createRef();
    this.layerEl = React.createRef();

    this.width = 1340;
    this.height = 300;

    this.ink = [[], [], []];

    this.state = {
      showInk: false,
      debugData: ""
    }
  }

  componentDidMount() {
    let stage = this.stageEl.current.getStage();
    let layer = this.layerEl.current

    let isPaint = false;
    let lastLine;

    let timer = 0;
    let lastTimestamp = 0;
    
    stage.on("mousedown touchstart", (event) => {
      let thisTimestamp = Date.now();

      isPaint = true;
      let pos = stage.getPointerPosition();

      lastLine = new Konva.Line({
        stroke: "red",
        strokeWidth: 5,
        globalCompositeOperation: "source-over",
        points: [pos.x, pos.y],
      });

      layer.add(lastLine);

      let time = 0;

      if (timer === 0) {
        timer = 1;
      } else {
        let timeDelta = thisTimestamp - lastTimestamp;
        time = this.ink[2][this.ink[2].length - 1] + timeDelta;
      }

      this.updateInk(pos.x, pos.y, time);
      lastTimestamp = thisTimestamp;
    });

    stage.on("mousemove touchmove", (event) => {
      let thisTimestamp = Date.now();
      
      if (!isPaint) {
        return;
      }

      let pos = stage.getPointerPosition();
      let newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      layer.batchDraw();

      let timeDelta = thisTimestamp - lastTimestamp;
      let time = this.ink[2][this.ink[2].length - 1] + timeDelta;
      this.updateInk(pos.x, pos.y, time);
      lastTimestamp = thisTimestamp;
    });
    
    stage.on("mouseup touchend", (event) => {
      isPaint = false;
    });
  }

  updateInk(x, y, time) {
    this.ink[0].push(Math.floor(x));
    this.ink[1].push(Math.floor(y));
    this.ink[2].push(Math.floor(time));
  }

  searchOnClick() {
    let requestBody = new URLSearchParams();

    requestBody.append("width", this.width);
    requestBody.append("height", this.height);
    requestBody.append("limit_size", 100);

    requestBody.append("a", "[" + this.ink[0].toString() + "]");
    requestBody.append("b", "[" + this.ink[1].toString() + "]");
    requestBody.append("c", "[" + this.ink[2].toString() + "]");

    fetch("https://e04e9e53a1d2.ngrok.io/api/sketch_search/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: requestBody
    }).then((response) => response.json())
      .then(
        (data) => this.parseRequestData(data),
        (error) => console.log(error)
      );
  }

  parseRequestData(data) {
    let imageList = data.results.list_img;

    this.history.push({
      pathname: "/search",
      state: {
        type: "text",
        value: this.ink[0].length,
        curImages: imageList
      }
    })
  }
	
  render() {
	  return (
      <div className="sketch-div">
        <h2 className="sketch-header">Sketch Search</h2>

        <h6 className="sketch-instruction">
          Sketch what you want to search for:
        </h6>

        <Stage
          className="sketch-border"
          width={this.width}
          height={this.height}
          ref={this.stageEl}
        >
          <Layer ref={this.layerEl} />
        </Stage>

        <br />

        <button className="sketch-button" onClick={() => this.searchOnClick()}>
          Search
        </button>

        {
          this.state.showInk && (
            <div>
              <h1>{this.ink[0].toString()}</h1>

              <br />

              <h1>{this.ink[1].toString()}</h1>

              <br />

              <h1>{this.ink[2].toString()}</h1>
            </div>
          )
        }

        <h1>{this.state.debugData}</h1>
      </div>
    );
  }
}

export default Sketch;

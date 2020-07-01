import React from 'react';
import Konva from 'konva';
import {
  Stage,
  Layer
} from 'react-konva';

class Sketch extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;

    this.stageEl = React.createRef();
    this.layerEl = React.createRef();

    this.ink = [[], [], []];
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
    this.ink[0].push(x);
    this.ink[1].push(y);
    this.ink[2].push(time);
  }

  searchOnClick() {
    this.history.push({
      pathname: "/search",
      state: {
        type: "sketch",
        value: this.ink[0].length
      }
    })
  }
	
  render() {
	  return (
      <div>
        <h2>Sketch</h2>

        <Stage width="1000" height="300" ref={this.stageEl}>
          <Layer ref={this.layerEl} />
        </Stage>

        <br />

        <button onClick={() => this.searchOnClick()}>
          Search
        </button>
      </div>
    );
  }
}

export default Sketch;

import React from 'react';
import "./Home.css"

class Home extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;
    this.location = this.props.location;

    if (typeof this.location.state === "undefined") {
      this.refine = false;
    } else {
      this.refine = true;
      this.curImages = this.location.state.curImages;
    }
  }

  textOnClick() {
    this.history.push({
      pathname: "/text",
      state: {
        refine: this.refine,
        curImages: this.curImages
      }
    })
  }

  imageOnClick() {
    this.history.push({
      pathname: "/image",
      state: {
        refine: this.refine,
        curImages: this.curImages
      }
    })
  }

  sketchOnClick() {
    this.history.push({
      pathname: "/sketch",
      state: {
        refine: this.refine,
        curImages: this.curImages
      }
    })
  }
    
  render() {
    return (
      <div className="home-div">
        <h1 className="home-header">Home</h1>

        <h6 className="home-instruction">
          Choose one of the following ways to search:
        </h6>
      
        <button className="home-button" onClick={() => this.textOnClick()}>
          Text
        </button>
      
        <button className="home-button" onClick={() => this.imageOnClick()}>
          Image
        </button>

        <button className="home-button" onClick={() => this.sketchOnClick()}>
          Sketch
        </button>

        <br />

        <h6 className="home-instruction">
          Or you can clear the working memory:
        </h6>

        <br />

        <button className="home-button" onClick={() => this.refine = false}>
          Clear
        </button>
      </div>
    );
  }
}

export default Home;

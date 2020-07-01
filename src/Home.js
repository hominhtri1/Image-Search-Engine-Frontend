import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;
  }
    
  render() {
    return (
      <div>
        <h2>Home</h2>
      
        <button onClick={() => this.history.push("/text")}>
          Text
        </button>
      
        <button onClick={() => this.history.push("/image")}>
          Image
        </button>

        <button onClick={() => this.history.push("/sketch")}>
          Sketch
        </button>
      </div>
    );
  }
}

export default Home;

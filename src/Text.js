import React from 'react';

class Text extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;

    this.state = {
      value: ""
    };
  }
  
  searchOnClick() {
    this.history.push({
      pathname: "/search",
      state: {
        type: "text",
        value: this.state.value
      }
    })
  }
	
  render() {
	  return (
      <div>
        <h2>Text</h2>
      
        <input
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({value: event.target.value})}
        />
  
        <br />
        <br />
      
        <button onClick={() => this.searchOnClick()}>
          Search
        </button>
      </div>
    );
  }
}

export default Text;

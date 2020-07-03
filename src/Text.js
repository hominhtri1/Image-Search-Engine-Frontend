import React from 'react';
import "./Text.css"

class Text extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;
    this.location = this.props.location;

    this.refine = this.location.state.refine;
    this.curImages = this.location.state.curImages;

    this.state = {
      value: "",
      debugData: ""
    };
  }
  
  searchOnClick() {
    let requestBody = new URLSearchParams();

    if (!this.refine) {
      requestBody.append("type_request", "search");
      requestBody.append("limit_size", 100);
      requestBody.append("text", this.state.value);
    } else {
      requestBody.append("type_request", "refine");
      // requestBody.append("limit_size", 10);
      requestBody.append("text", this.state.value);

      let curImageIds = this.curImages.map((image) => image.id);

      requestBody.append("list_imgIds", "[" + curImageIds.join(", ") + "]");
    }

    fetch("https://a591a6186014.ngrok.io/api/text_search/search/", {
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
        value: this.state.value,
        curImages: imageList
      }
    })
  }

  dummyOnClick() {
    this.history.push({
      pathname: "/search",
      state: {}
    })
  }
	
  render() {
	  return (
      <div className="text-div">
        <h1 className="text-header">Text Search</h1>

        <h6 className="text-instruction">
          Enter the text you want to search for:
        </h6>
      
        <input
          className="text-input"
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({value: event.target.value})}
        />

        <br />
        <br />
      
        <button className="text-button" onClick={() => this.searchOnClick()}>
          Search
        </button>

        <h1>{this.state.debugData}</h1>
      </div>
    );
  }
}

export default Text;

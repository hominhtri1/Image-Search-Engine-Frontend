import React from 'react';
import "./Search.css"

class Search extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;
    this.location = this.props.location;

    this.value = this.location.state.value;
    this.curImages = this.location.state.curImages;

    if (typeof this.curImages === "undefined") {
      this.curImages = [
        {coco_url: "https://i.ytimg.com/vi/bH5ptvpS1ic/maxresdefault.jpg"},
        {coco_url: "http://images.pushsquare.com/2447800160774/god-of-war-iii-remastered-ps4-playstation-4-1.original.jpg"},
        {coco_url: "https://i.ytimg.com/vi/9EvP4NWW0T0/maxresdefault.jpg"}
      ];
    }
    
    this.state = {
      choose: Array(this.curImages.length).fill(-1)
    }
  }

  imageOnClick(index, value) {
    let tempChoose = this.state.choose.slice();
    tempChoose[index] = value;
    this.setState({ choose: tempChoose })
  }

  homeOnClick() {
    this.history.push({
      pathname: "/",
      state: {
        curImages: this.curImages
      }
    })
  }
    
  render() {
    return (
      <div className="search-div">
        <h1 className="search-header">Search Results</h1>

        {
          this.curImages.map((image, index) => (
            <div key={index}>
              <img
                width="300"
                height="300"
                src={image.coco_url}
                alt=""
              />

              <br />
              <br />
            </div>
          ))
        }
    
        <button className="search-button" onClick={() => this.homeOnClick()}>
          Home
        </button>
      </div>
    );
  }
}

export default Search;

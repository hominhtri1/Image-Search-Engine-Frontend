import React from 'react';
import "./Image.css";

class Image extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;

    this.value = "";

    this.state = {
      value: "",
      image: ""
    };
  }

  imageOnChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.value = event.target.value;

      let reader = new FileReader();

      reader.onload = (event2) => {
        this.setState({ image: event2.target.result });
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  searchOnClick() {
    let requestBody = new URLSearchParams();

    let imageUrl = this.state.image;

    if (imageUrl === "") {
      imageUrl = this.state.value;
    }

    requestBody.append("image_url", imageUrl);
    requestBody.append("limit_size", 100);

    fetch("https://ec35e7629360.ngrok.io/api/image_search/search/", {
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
        type: "image",
        value: this.state.value,
        curImages: imageList
      }
    })
  }
	
  render() {
	  return (
      <div className="image-div">
        <h1 className="image-header">Image Search</h1>

        <h6 className="image-instruction">
          Enter the url of the image you want to search for:
        </h6>

        <input
          className="image-input"
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({value: event.target.value})}
        />

        <button
          className="image-button"
          onClick={() => this.setState({ image: this.state.value })}
        >
          Show
        </button>

        <h6 className="image-instruction">
          Click "Show" to show the image at the entered url
        </h6>

        {
          this.state.image !== "" && (
            <div>
              <img
                width="300"
                height="300"
                src={this.state.image}
                alt=""
              />

              <br />
              <br />
            </div>
          )
        }
      
        <button className="image-button" onClick={() => this.searchOnClick()}>
          Search
        </button>
      </div>
    );
  }
}

export default Image;

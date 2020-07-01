import React from 'react';

class Image extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;

    this.value = "";

    this.state = {
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
    this.history.push({
      pathname: "/search",
      state: {
        type: "image",
        value: this.value,
      }
    })
  }
	
  render() {
	  return (
      <div>
        <h2>Image</h2>
      
        <input
          type="file"
          accept="image/*"
          onChange={(event) => this.imageOnChange(event)}
        />
  
        <br />
        <br />

        {
          this.state.image !== "" && (
            <div>
              <img
                width="100"
                height="100"
                src={this.state.image}
                alt=""
              />

              <br />
              <br />
            </div>
          )
        }
      
        <button onClick={() => this.searchOnClick()}>
          Search
        </button>
      </div>
    );
  }
}

export default Image;

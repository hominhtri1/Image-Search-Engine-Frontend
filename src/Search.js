import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    
    this.history = this.props.history;
    this.location = this.props.location;

    this.value = this.location.state.value;

    this.imageSources = [
      "https://i.ytimg.com/vi/bH5ptvpS1ic/maxresdefault.jpg",
      "http://images.pushsquare.com/2447800160774/god-of-war-iii-remastered-ps4-playstation-4-1.original.jpg",
      "https://i.ytimg.com/vi/9EvP4NWW0T0/maxresdefault.jpg"
    ];
  }
    
  render() {
    return (
      <div>
        <h2>Search</h2>

        <h3>{this.value}</h3>

        {
          this.imageSources.map((image) => (
            <div>
              <img
                width="100"
                height="100"
                src={image}
                alt=""
              />

              <br />
              <br />
            </div>
          ))
        }
    
        <button onClick={() => this.history.push("/")}>
          Home
        </button>
      </div>
    );
  }
}

export default Search;

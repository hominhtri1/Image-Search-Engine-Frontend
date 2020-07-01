import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home"
import Text from "./Text"
import Image from "./Image"
import Sketch from "./Sketch"
import Search from "./Search"

class App extends React.Component {
  render() {
	  return (
      <div>
        <Switch>
          <Route path="/text" component={ Text } />

          <Route path="/image" component={ Image } />

          <Route path="/sketch" component={ Sketch } />

          <Route path="/search" component={ Search } />

          <Route path="/" component={ Home } />
        </Switch>
      </div>
    );
  }
}

export default App;

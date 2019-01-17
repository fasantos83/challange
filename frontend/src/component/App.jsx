import React from "react";
import "./App.css";
import DealList from "./DealList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="component-app">
        <DealList/>
      </div>
    );
  }
}
export default App;
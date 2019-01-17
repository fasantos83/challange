import React from "react";
import "./App.css";
import Deal from "./Deal";
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="component-app">
        <Deal />
      </div>
    );
  }
}
export default App;
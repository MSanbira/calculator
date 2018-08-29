import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CalcBar from "./components/clacBar";
import InputBar from "./components/inputBar";
import NumPad from "./components/numPad";
import FunctionPad from "./components/functionPad";
import HistoryAndMemory from "./components/historyAndMemory";

class App extends Component {
  state = {
    inputValue: 0
  };

  handleAddNumToInput = num => {
    console.log(num);
  };

  handleNewFunction = sign => {
    console.log(sign);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <CalcBar />
          <InputBar />
          <div className="btn-container">
            <NumPad onNumClick={this.handleAddNumToInput} />
            <FunctionPad onFunctionClick={this.handleNewFunction} />
          </div>
          <HistoryAndMemory />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

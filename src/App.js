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
    inputValue: 0,
    chosenFunction: null,
    calcBarText: "",
    result: 0,
    lastInput: 0,
    numMemory: null
  };

  handleAddNumToInputFromBtn = num => {
    let inputValue;
    if (this.state.inputValue == 0) {
      inputValue = num;
    } else {
      inputValue = (this.state.inputValue + num.toString()).substr(0, 15);
    }
    this.setState({ inputValue });
  };

  handleEditKeyboardInput = event => {
    let inputValue;
    if (this.state.inputValue == 0) {
      inputValue = event.target.value.substr(1, 16);
    } else {
      inputValue = event.target.value.substr(0, 15);
    }
    if (event.target.value == "") {
      inputValue = 0;
    }
    this.setState({ inputValue });
  };

  handleNewFunction = sign => {
    console.log(sign);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="calc-container">
            <CalcBar />
            <InputBar
              inputValue={this.state.inputValue}
              onEditInput={this.handleEditKeyboardInput}
            />
            <div className="btn-container">
              <NumPad onNumClick={this.handleAddNumToInputFromBtn} />
              <FunctionPad onFunctionClick={this.handleNewFunction} />
            </div>
          </div>
          <HistoryAndMemory />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

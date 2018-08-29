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
    numMemory: null,
    isDotInInput: false,
    isWriteNextNum: false
  };

  handleAddNumToInputFromBtn = num => {
    let inputValue;
    if (num === ".") {
      if (!this.state.isDotInInput) {
        inputValue = (this.state.inputValue + num).substr(0, 15);
        this.setState({ isDotInInput: true });
        this.setState({ inputValue });
      }
    } else {
      if (this.state.inputValue === 0) {
        inputValue = num;
      } else {
        inputValue = (this.state.inputValue + num.toString()).substr(0, 15);
      }
      this.setState({ inputValue });
    }
  };

  handleEditKeyboardInput = event => {
    let inputValue;
    if (!isNaN(event.target.value)) {
      if (this.state.inputValue === 0 && event.target.value !== '0.') {
        inputValue = event.target.value.substr(1, 16);
      } else {
        inputValue = event.target.value.substr(0, 15);
      }
      if (event.target.value === "") {
        inputValue = 0;
      }
      this.setState({ inputValue });
    }
  };

  handleNewFunction = sign => {
    if (sign === "ce") {
      this.DeleteInput();
    } else if (sign === "c") {
      this.DeleteCalculations();
    } else if (sign === "ms") {
      this.saveToMemory();
    } else if (sign === "mr") {
      this.inputMemory();
    } else if (sign === "mc") {
      this.clearMemory();
    } else if (sign === "+-") {
      this.changeSignInput();
    } else if (sign === "+" || sign === "-" || sign === "X" || sign === "/") {
      this.handleChosenFunction(sign);
    } else if (sign === "X2" || sign === "sqr") {
      this.handleChosenFunction(sign);
      this.showResult();
    } else if (sign === "=") {
      this.showResult();
    }
  };

  DeleteInput = () => {
    let inputValue = 0;
    this.setState({
      inputValue: inputValue,
      isDotInInput: false
    });
  };

  DeleteCalculations = () => {
    let numMemory = this.state.numMemory;
    this.setState({
      inputValue: 0,
      chosenFunction: null,
      calcBarText: "",
      result: 0,
      lastInput: 0,
      numMemory: numMemory,
      isDotInInput: false
    });
  };

  saveToMemory = () => {
    let numMemory = this.state.inputValue;
    this.setState({ numMemory });
  };

  inputMemory = () => {
    if (this.state.numMemory !== null) {
      let inputValue = this.state.numMemory;
      this.setState({ inputValue });
    }
  };

  clearMemory = () => {
    let numMemory = null;
    this.setState({ numMemory });
  };

  changeSignInput = () => {
    let inputValue = -this.state.inputValue;
    this.setState({ inputValue });
  };

  handleChosenFunction = sign => {};

  showResult = () => {};

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
              <NumPad
                onNumClick={this.handleAddNumToInputFromBtn}
                onFunctionClick={this.handleNewFunction}
              />
              <FunctionPad onFunctionClick={this.handleNewFunction} />
            </div>
          </div>
          <HistoryAndMemory numMemory={this.state.numMemory} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

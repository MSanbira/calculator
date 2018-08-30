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
    calcBarText: "",
    calcBarSign: "",
    chosenFunction: null,
    firstValue: null,
    lastValue: null,
    result: 0,
    numMemory: null,
    isDotInInput: false,
    isWriteNextNum: false
  };

  handleAddNumToInputFromBtn = num => {
    let inputValue;
    let lastValue = this.state.lastValue;
    if (num === ".") {
      if (!this.state.isDotInInput) {
        inputValue = (this.state.inputValue + num).substr(0, 15);
        this.setState({ isDotInInput: true });
        this.setState({ inputValue });
      }
    } else {
      if (this.state.inputValue === 0 || lastValue === null) {
        inputValue = num;
        lastValue = 'temp';
      } else {
        inputValue = (this.state.inputValue + num.toString()).substr(0, 15);
      }
      this.setState({ inputValue, lastValue });
    }
  };

  handleEditKeyboardInput = event => {
    let inputValue;
    if (!isNaN(event.target.value)) {
      if (this.state.inputValue === 0 && event.target.value !== "0.") {
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
    } else if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
      this.handleChosenFunction(sign);
    } else if (sign === "X2" || sign === "sqr") {
      this.handleChosenFunction(sign);
      this.showResult();
    } else if (sign === "=") {
      this.showResult();
    }
  };

  DeleteInput = () => {
    const inputValue = 0;
    this.setState({
      inputValue: inputValue,
      isDotInInput: false
    });
  };

  DeleteCalculations = () => {
    const numMemory = this.state.numMemory;
    this.setState({
      inputValue: 0,
      calcBarText: "",
      calcBarSign: "",
      chosenFunction: null,
      firstValue: null,
      lastValue: null,
      result: 0,
      numMemory: numMemory,
      isDotInInput: false,
      isWriteNextNum: false
    });
  };

  saveToMemory = () => {
    const numMemory = this.state.inputValue;
    this.setState({ numMemory });
  };

  inputMemory = () => {
    if (this.state.numMemory !== null) {
      const inputValue = this.state.numMemory;
      this.setState({ inputValue });
    }
  };

  clearMemory = () => {
    const numMemory = null;
    this.setState({ numMemory });
  };

  changeSignInput = () => {
    const inputValue = -this.state.inputValue;
    this.setState({ inputValue });
  };

  handleChosenFunction = sign => {
    let firstValue = this.state.firstValue;
    let calcBarText = this.state.calcBarText;
    const lastValue = null;
    const chosenFunction = sign;
    if (this.state.firstValue === null) {
      firstValue = this.state.inputValue;
    } else if (this.state.firstValue !== this.state.inputValue) {
      firstValue = this.getCalculation(
        this.state.firstValue,
        this.state.chosenFunction,
        this.state.inputValue
      );
      this.setState({inputValue: firstValue});
      calcBarText += " " + this.state.chosenFunction + " " + this.state.inputValue;
    }
    if (firstValue === "Error") {
      this.setState({ inputValue: "Error" });
    } else {
      if (calcBarText === "") {
        calcBarText = firstValue;
      }
    }
    this.setState({
      firstValue: firstValue,
      lastValue: lastValue,
      calcBarText: calcBarText,
      calcBarSign: sign,
      chosenFunction: chosenFunction
    });
  };

  showResult = () => {};

  getCalculation = (firstValue, sign, lastValue) => {
    const sum = eval(firstValue + sign + lastValue);
    console.log(sum);
    if (sum < Math.pow(10, 15)) {
      return sum;
    } else {
      return "Error";
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="calc-container">
            <CalcBar calcBarText={this.state.calcBarText} calcBarSign={this.state.calcBarSign} />
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

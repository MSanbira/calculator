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
    chosenSign: null,
    firstValue: null,
    lastValue: null,
    numMemory: null,
    isWriteNewNum: false,
    isInputChange: false,
    historyText: [],
    historyKey: 0
  };

  handleAddNumToInputFromBtn = num => {
    let inputValue = this.state.inputValue;
    let lastValue = this.state.lastValue;
    let isWriteNewNum = this.state.isWriteNewNum;
    if (!isNaN(this.state.inputValue + num.toString())) {
      if (this.state.inputValue === 0 || lastValue === null || isWriteNewNum === true) {
        inputValue = num;
        isWriteNewNum = false;
        if (lastValue === null) {
          lastValue = "temp";
        }
      } else {
        inputValue = (this.state.inputValue + num.toString()).substr(0, 15);
      }
    }
    this.setState({ inputValue, lastValue, isWriteNewNum });
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

  handleClearHistory = () => {
    this.setState({ historyText: [] });
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
      this.handleChosenSign(sign);
    } else if (sign === "&#178;" || sign === "&#8730;") {
      this.handleChosenSign(sign);
      this.showResult();
    } else if (sign === "=") {
      this.showResult();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="calc-container">
            <CalcBar
              calcBarText={this.state.calcBarText}
              calcBarSign={this.state.calcBarSign}
            />
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
          <HistoryAndMemory
            numMemory={this.state.numMemory}
            historyText={this.state.historyText}
            handleClearHistory={this.handleClearHistory}
          />
        </div>
      </React.Fragment>
    );
  }

  DeleteInput = () => {
    const inputValue = 0;
    this.setState({
      inputValue: inputValue,
    });
  };

  DeleteCalculations = () => {
    const numMemory = this.state.numMemory;
    this.setState({
      inputValue: 0,
      calcBarText: "",
      calcBarSign: "",
      chosenSign: null,
      firstValue: null,
      lastValue: null,
      numMemory: numMemory,
      isWriteNewNum: false
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

  handleChosenSign = sign => {
    let firstValue = this.state.firstValue;
    let calcBarText = this.state.calcBarText;
    const lastValue = null;
    const chosenSign = sign;
    if (this.state.firstValue === null) {
      firstValue = this.state.inputValue;
    } else if (this.state.firstValue !== this.state.inputValue) {
      firstValue = this.getCalculation(
        this.state.firstValue,
        this.state.chosenSign,
        this.state.inputValue
      );
      this.setState({ inputValue: firstValue });
      calcBarText += " " + this.state.chosenSign + " " + this.state.inputValue;
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
      chosenSign: chosenSign,
      isInputChange: false
    });
  };

  showResult = () => {
    let lastValue = this.state.lastValue;
    let calcBarText = this.state.calcBarText;
    let isInputChange = this.state.isInputChange;
    let isWriteNewNum = this.state.isWriteNewNum;
    const firstValue = (isInputChange ? this.state.inputValue : this.state.firstValue);
    if (this.state.lastValue === "temp" || this.state.lastValue === null) {
      lastValue = this.state.inputValue;
      isWriteNewNum = true;
      isInputChange = true;
    } else {
      calcBarText = this.state.inputValue;
    }
    let result = this.getCalculation(
      firstValue,
      this.state.chosenSign,
      lastValue
    );
    const historyTextNew = {
      text:
        calcBarText +
        " " +
        this.state.chosenSign +
        " " +
        lastValue +
        " = " +
        result,
      key: this.state.historyKey
    };

    this.setState({
      inputValue: result,
      firstValue: result,
      calcBarText: "",
      calcBarSign: "",
      historyText: this.state.historyText.concat(historyTextNew),
      historyKey: this.state.historyKey + 1,
      lastValue: lastValue,
      isWriteNewNum: isWriteNewNum,
      isInputChange: isInputChange
    });
  };

  getCalculation = (firstValue, sign, lastValue) => {
    const sum = eval(firstValue + sign + lastValue);
    console.log(sum);
    if (sum < Math.pow(10, 15)) {
      return sum;
    } else {
      return "Error";
    }
  };
}

export default App;

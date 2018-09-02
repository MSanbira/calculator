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
    modifyInputText: "",
    chosenSign: null,
    firstValue: null,
    lastValue: null,
    numMemory: null,
    isWriteNewNum: false,
    isInputChange: false,
    isError: false,
    historyText: [],
    historyKey: 0
  };

  componentWillMount() {
    document.addEventListener("keydown", this.handleOnKeyDown);
  }

  handleOnKeyDown = event => {
    const key = event.keyCode;
    if (key >= 96 && key <= 105) {
      this.handleAddNumToInputFromBtn(key - 96);
    } else if (key >= 48 && key <= 57) {
      this.handleAddNumToInputFromBtn(key - 48);
    } else if (key === 107) {
      this.handleChosenSign("+");
    } else if (key === 109) {
      this.handleChosenSign("-");
    } else if (key === 106) {
      this.handleChosenSign("*");
    } else if (key === 111) {
      this.handleChosenSign("/");
    } else if (key === 13) {
      this.showResult();
    } else if (key === 110) {
      this.handleAddNumToInputFromBtn(".");
    }
  };

  handleAddNumToInputFromBtn = num => {
    let inputValue = this.state.inputValue;
    let lastValue = this.state.lastValue;
    let isWriteNewNum = this.state.isWriteNewNum;
    if (!this.state.isError) {
      if (!isNaN(this.state.inputValue + num.toString())) {
        if (
          this.state.inputValue === 0 ||
          lastValue === null ||
          isWriteNewNum === true
        ) {
          inputValue = num;
          isWriteNewNum = false;
          lastValue === null ? (lastValue = "temp") : (lastValue = lastValue);
        } else {
          inputValue = (this.state.inputValue + num.toString()).substr(0, 15);
        }
      }
      this.setState({ inputValue, lastValue, isWriteNewNum });
    }
    // blur to all btns
    const btns = document.querySelectorAll(".btn");
    for (const btn of btns) {
      btn.blur();
    }
  };

  handleClearHistory = () => {
    this.setState({ historyText: [] });
  };

  handleNewFunction = sign => {
    if (sign === "c") {
      this.DeleteCalculations();
    }
    if (!this.state.isError) {
      if (sign === "ce") {
        this.DeleteInput();
      } else if (sign === "ms") {
        this.saveToMemory();
      } else if (sign === "mr") {
        this.inputMemory();
      } else if (sign === "mc") {
        this.clearMemory();
      } else if (sign === "+-") {
        this.changePlusMinusSignInput();
      } else if (sign === "+" || sign === "-" || sign === "*" || sign === "/") {
        this.handleChosenSign(sign);
      } else if (sign === "²" || sign === "√") {
        this.modifyInput(sign);
      } else if (sign === "=") {
        this.showResult();
      }
    }
    // blur to all btns
    const btns = document.querySelectorAll(".btn");
    for (const btn of btns) {
      btn.blur();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" tabIndex="0">
          <div className="calc-container">
            <CalcBar
              calcBarText={this.state.calcBarText}
              calcBarSign={this.state.calcBarSign}
              modifyInputText={this.state.modifyInputText}
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
    this.setState({ inputValue: 0 });
  };

  DeleteCalculations = () => {
    this.setState({
      inputValue: 0,
      calcBarText: "",
      calcBarSign: "",
      modifyInputText: "",
      chosenSign: null,
      firstValue: null,
      lastValue: null,
      isWriteNewNum: false,
      isInputChange: false,
      isError: false
    });
  };

  saveToMemory = () => {
    this.setState({ numMemory: this.state.inputValue });
  };

  inputMemory = () => {
    if (this.state.numMemory !== null) {
      this.setState({ inputValue: this.state.numMemory });
    }
  };

  clearMemory = () => {
    this.setState({ numMemory: null });
  };

  changePlusMinusSignInput = () => {
    this.setState({ inputValue: -this.state.inputValue });
  };

  handleChosenSign = sign => {
    let firstValue = this.state.firstValue;
    let calcBarText = this.state.calcBarText;
    const lastValue = null;
    // no firstValue or new calculation
    if (this.state.firstValue === null || this.state.isInputChange) {
      firstValue = this.state.inputValue;
    }
    // firstValue needs calculation
    else {
      firstValue = this.getCalculation(
        this.state.firstValue,
        this.state.chosenSign,
        this.state.inputValue
      );
      this.setState({ inputValue: firstValue });
      calcBarText += " " + this.state.chosenSign + " " + this.state.inputValue;
    }
    // initializing the calcBarText with firstValue
    if (calcBarText === "") {
      calcBarText = firstValue;
    }

    if (firstValue !== "Error") {
      this.setState({
        firstValue: firstValue,
        lastValue: lastValue,
        calcBarText: calcBarText,
        calcBarSign: sign,
        chosenSign: sign,
        isInputChange: false,
        modifyInputText: ""
      });
    }
  };

  modifyInput = sign => {
    console.log("modify");
    let modifyInputText;
    this.state.modifyInputText === ""
      ? (modifyInputText = this.state.inputValue)
      : (modifyInputText = this.state.modifyInputText);
    let inputValue = this.state.inputValue;
    // creating the calculation text
    if (sign === "²") {
      modifyInputText = "(" + modifyInputText + ")" + sign;
    } else if (sign === "√") {
      modifyInputText = sign + "(" + modifyInputText + ")";
    }
    // calculating
    inputValue = this.getCalculation(this.state.inputValue, sign);

    if (inputValue !== "Error") {
      this.setState({ inputValue, modifyInputText });
    }
  };

  showResult = () => {
    let lastValue = this.state.lastValue;
    let calcBarText = this.state.calcBarText;
    let isInputChange = this.state.isInputChange;
    let isWriteNewNum = this.state.isWriteNewNum;
    let result;
    const firstValue = isInputChange
      ? this.state.inputValue
      : this.state.firstValue;
    // seting the lastValue number
    if (this.state.lastValue === "temp" || this.state.lastValue === null) {
      lastValue = this.state.inputValue;
      isWriteNewNum = true;
      isInputChange = true;
    } else {
      calcBarText = this.state.inputValue;
    }
    // geting the result
    if (firstValue === null || this.state.chosenSign === null) {
      result = this.state.inputValue;
    } else {
      result = this.getCalculation(
        firstValue,
        this.state.chosenSign,
        lastValue
      );
    }
    // seting a new history calculation line
    const historyTextNew = {
      text:
        (this.state.chosenSign !== null
          ? calcBarText + " " + this.state.chosenSign
          : "") +
        " " +
        lastValue +
        " = " +
        result,
      key: this.state.historyKey
    };

    if (result !== "Error") {
      this.setState({
        inputValue: result,
        firstValue: result,
        calcBarText: "",
        calcBarSign: "",
        historyText: this.state.historyText.concat(historyTextNew),
        historyKey: this.state.historyKey + 1,
        lastValue: lastValue,
        isWriteNewNum: isWriteNewNum,
        isInputChange: isInputChange,
        modifyInputText: ""
      });
    }
  };

  getCalculation = (firstValue, sign, lastValue) => {
    let sum;
    if (sign === "²") {
      sum = Math.pow(firstValue, 2);
    } else if (sign === "√") {
      sum = Math.sqrt(firstValue);
    } else {
      sum = eval(firstValue + sign + lastValue);
    }
    console.log(sum);
    if (sum < Math.pow(10, 15) && sum !== NaN) {
      return sum;
    } else {
      this.setState({
        isError: true,
        inputValue: "Error",
        calcBarText: "",
        calcBarSign: "",
        modifyInputText: ""
      });
      return "Error";
    }
  };
}

export default App;

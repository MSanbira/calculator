import React, { Component } from "react";

class FunctionPad extends Component {
  render() {
    return (
      <div className="function-pad">
        <div className="btns-row">
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("ce")}
          >
            ce
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("c")}
          >
            c
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("ms")}
          >
            Ms
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("+")}
          >
            +
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("*")}
          >
            x
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("mr")}
          >
            Mr
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("-")}
          >
            -
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("/")}
          >
            &#247;
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("mc")}
          >
            Mc
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("²")}
          >
            x²
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("√")}
          >
            √
          </button>
          <button
            className="btn btn-function"
            onClick={() => this.props.onFunctionClick("=")}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default FunctionPad;

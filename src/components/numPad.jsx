import React, { Component } from "react";

class NumPad extends Component {
  render() {
    return (
      <div className="num-pad">
        <div className="btns-row">
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(7)}
          >
            7
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(8)}
          >
            8
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(9)}
          >
            9
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(4)}
          >
            4
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(5)}
          >
            5
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(6)}
          >
            6
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(1)}
          >
            1
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(2)}
          >
            2
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(3)}
          >
            3
          </button>
        </div>
        <div className="btns-row">
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(0)}
          >
            0
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick(".")}
          >
            .
          </button>
          <button
            className="btn btn-number"
            onClick={() => this.props.onNumClick("*")}
          >
            + -
          </button>
        </div>
      </div>
    );
  }
}

export default NumPad;

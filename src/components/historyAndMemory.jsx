import React, { Component } from "react";

class HistoryAndMemory extends Component {
  render() {
    return (
      <div className="history-memory-container">
        <div className="history-container">
          <h1>History</h1>
          <div className="history-text">
            {this.props.historyText.map(line => (
              <p key={line.key}>{line.text}</p>
            ))}
          </div>
        </div>
        <div className="memory-container">
          <h1>Memory</h1>
          <h2>{this.props.numMemory !== null ? this.props.numMemory : ""}</h2>
        </div>
      </div>
    );
  }
}

export default HistoryAndMemory;

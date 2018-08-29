import React, { Component } from 'react';

class InputBar extends Component {

    render() { 
        return ( <input className="input-bar" type="number" value={this.props.inputValue} onChange={this.props.onEditInput}></input> );
    }
}
 
export default InputBar;
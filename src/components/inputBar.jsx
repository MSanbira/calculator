import React, { Component } from 'react';

class InputBar extends Component {

    render() { 
        return ( <input className="input-bar" type="text" value={this.props.inputValue}></input> );
    }
}
 
export default InputBar;
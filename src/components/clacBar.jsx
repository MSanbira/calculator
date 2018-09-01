import React, { Component } from 'react';

class CalcBar extends Component {

    render() { 
        return ( <p className="calc-bar">{this.props.calcBarText + " " + this.props.calcBarSign + " " + this.props.modifyInput}</p> );
    }
}
 
export default CalcBar;
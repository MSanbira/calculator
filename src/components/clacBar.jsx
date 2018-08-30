import React, { Component } from 'react';

class CalcBar extends Component {

    render() { 
        return ( <p className="calc-bar">{this.props.calcBarText + " " + this.props.calcBarSign}</p> );
    }
}
 
export default CalcBar;
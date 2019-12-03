import React, { Component } from 'react'
import smiley from './img/smiley.svg'

class Validation extends Component {
  handleClick() {
    this.props.clickHandler(this.props.button_text)
  }
  render() {
    return (
<div className="validation"><p className="validation-msg">Don't forget to answer the question</p><img src={smiley} alt="smiley face" /></div>
    )
  }
}

export default Validation
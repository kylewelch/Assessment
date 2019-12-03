import React, { Component } from 'react'
import image from './img/placeholder-image.svg'

class RadioCardButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.index, this.props.section, this.props.quiz_position)
  }
  render() {
    return (
        <button className="answer-card" onClick={this.handleClick.bind(this)}>
          <img src={image} alt="placeholder icon" />
        <p className="answer-card-text">{this.props.button_text}</p>
        </button>
    )
  }
}

export default RadioCardButton
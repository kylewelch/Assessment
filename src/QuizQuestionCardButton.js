import React, { Component } from 'react'
import image from './img/placeholder-image.svg'

class QuizQuestionCardButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.value)
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

export default QuizQuestionCardButton
import React, { Component } from 'react'

class CardButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.index, this.props.section, this.props.question_data.id, this.props.quiz_position - 1)
  }
  render() {
    return (
      <div className={this.props.isChecked ? "card-button card-button-selected" : "card-button"} onClick={this.handleClick.bind(this)}>
        <div className="card-button-content">
          <p className="card-button-title">{this.props.answer_option}</p>
          <p className={(this.props.question_data.id === 6) ? "card-button-text card-button-text-large" : "card-button-text"}>{this.props.answer_text}</p>
        </div>
      </div>
    )
  }
}

export default CardButton
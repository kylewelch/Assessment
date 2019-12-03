import React, { Component } from 'react'

class QuizQuestionInputCardButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.question_data.answer_options[this.props.answer_option], this.props.section, this.props.quiz_position)
  }
  render() {
    return (
      <div className={this.props.isChecked ? "input-card-option checked" : "input-card-option unchecked"} onClick={this.handleClick.bind(this)} >
        <p>{this.props.question_data.answer_text[this.props.answer_option]}</p>
      </div>
    )
  }
}

export default QuizQuestionInputCardButton
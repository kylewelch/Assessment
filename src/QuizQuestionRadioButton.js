import React, { Component } from 'react'

class QuizQuestionRadioButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.index, this.props.section, this.props.quiz_position)
  }
  render() {
    return (
      <div className="radio-option" onClick={this.handleClick.bind(this)}>
        <div className={this.props.isChecked ? "radio-circle checked" : "radio-circle unchecked"} data-value={this.props.answer_text}></div>
        <label className="radio-label"><span className={this.props.question_data.question_type === "radio" ? "radio-main-answer" : "radio-multi-answer"}>{this.props.answer_text}</span>{this.props.question_data.answer_description ? this.props.question_data.answer_description[this.props.index] : null}</label>
      </div>
    )
  }
}

export default QuizQuestionRadioButton
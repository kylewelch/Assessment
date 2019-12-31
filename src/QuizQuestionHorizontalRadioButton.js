import React, { Component } from 'react'

class QuizQuestionHorizontalRadioButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.index, this.props.section, this.props.question_data.id)
  }
  render() {
    return (
      <div className="radio-option-horiz" onClick={this.handleClick.bind(this)}>
        <div className={this.props.isChecked ? "radio-circle checked" : "radio-circle unchecked"} data-value={this.props.answer_text}></div>
        <label className="radio-label-horiz"><span className="radio-multi-answer">{this.props.answer_text}</span></label>
      </div>
    )
  }
}

export default QuizQuestionHorizontalRadioButton
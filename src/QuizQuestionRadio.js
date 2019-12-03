import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionRadio extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null
    }
  }
  handleClick(buttonText) {
    this.props.updateValue(buttonText)
  }
  showNextQuestion() {
    if (this.props.currentSkillValue === null) {
      this.setState({isIncomplete: true})
      return
    } 
    else {
      this.setState({isIncomplete: false})
    }
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>   
        {this.props.quiz_question.answer_options.map((answer_option, index) => {
          return <QuizQuestionRadioButton 
                    key={index} 
                    index={index}
                    answer_text={answer_option} 
                    isChecked={(this.props.currentSkillValue === index)}
                    clickHandler={this.handleClick.bind(this)} 
                    question_data={this.props.quiz_question} 
                  />
          })}
      {this.state.isIncomplete ? <Validation /> : null}
      <NavButton 
        button_text={this.props.quiz_question} 
        className=" "
        clickHandler={this.showNextQuestion.bind(this)} />
      <NavButton 
        button_text={this.props.nav_text} 
        className=" nav-btn-secondary"
        clickHandler={this.showPreviousQuestion.bind(this)} />
      </section>
    )
  }
}

export default QuizQuestionRadio
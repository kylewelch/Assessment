import React, { Component } from 'react'
import QuizQuestionCardButton from './QuizQuestionCardButton.js'
import NavButton from './NavButton.js'

let quizData = require('./quiz_data.json')

class QuizQuestionCards extends Component {
  handleClick(buttonText) {
    this.props.updateValue(buttonText)
    this.props.showNextQuestionHandler()
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
        <section className="buttons">   
          {this.props.quiz_question.answer_options.map((answer_option, index) => {
            return <QuizQuestionCardButton 
                     key={index} 
                     index={index}
                     value={this.props.quiz_question.values[index]}
                     button_text={answer_option} 
                     clickHandler={this.handleClick.bind(this)}
                     question_data={this.props.quiz_question}
                     answer_option={this.props.answer_option} />
            })}
          <NavButton 
            button_text={this.props.nav_text} 
            className=" nav-btn-secondary"
            clickHandler={this.showPreviousQuestion.bind(this)} />
        </section>
    )
  }
}

export default QuizQuestionCards
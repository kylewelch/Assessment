import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import QuizQuestionHorizontalRadio from './QuizQuestionHorizontalRadio.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionSubskills extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null
    }
  }
  handleClick(buttonText) {
    this.props.updateValue(buttonText)
  }
  updateSubskills(value, section, id) {
    this.props.updateSubskills(value, section, id)
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
        <div className="follow-up-section">
          <h2>How skilled are you at: </h2>
          {this.props.quiz_question.subskills.map((level, index) => {
            return <QuizQuestionHorizontalRadio 
                      key={index} 
                      index={index}
                      answer_text={level} 
                      isChecked={(this.props.currentSkillValue === index)}
                      updateSubskills={this.updateSubskills.bind(this)} 
                      question_data={this.props.quiz_question}
                      subskillValue={this.props.subskills[index]}
                    />
            })}
            <Upload 
              skills={this.props.quiz_question.subskills}
            />
        </div>
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

export default QuizQuestionSubskills
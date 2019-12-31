import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import QuizQuestionHorizontalRadio from './QuizQuestionHorizontalRadio.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionMultiFormat extends Component {
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
    this.props.updateSectionValue(value, section, id)
  }
  calculateTotal() {
    let scores = this.props.section_values
    
    for (let i = 0; i < this.props.quiz_question.subskills.length; i++) {
      if (scores[i] === null) {
          this.setState({isIncomplete: true})
          return
        }
        else {
          this.setState({isIncomplete: false})
      }
    }

    let values = scores.map(x => x * 1.25)


    this.props.updateTotalValue(Math.round((values.reduce((a,b) => a + b, 0))/5));
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>   
          <div className="follow-up-section">
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
        clickHandler={this.calculateTotal.bind(this)} />
      <NavButton 
        button_text={this.props.nav_text} 
        className=" nav-btn-secondary"
        clickHandler={this.showPreviousQuestion.bind(this)} />
      </section>
    )
  }
}

export default QuizQuestionMultiFormat
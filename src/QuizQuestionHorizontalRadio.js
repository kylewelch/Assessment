import React, { Component } from 'react'
import QuizQuestionHorizontalRadioButton from './QuizQuestionHorizontalRadioButton.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionHorizontalRadio extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null
    }
  }
  handleClick(value, section, id) {
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
      <section className="horizontal-radio"> 
        <h3>{this.props.question_data.subskills[this.props.index]}</h3>
          <div className="radio-row">
            {this.props.question_data.subskill_levels.map((level, index) => {
              return <QuizQuestionHorizontalRadioButton 
                        key={index} 
                        index={index}
                        section={this.props.index}
                        answer_text={level} 
                        isChecked={(this.props.subskillValue === index)}
                        clickHandler={this.handleClick.bind(this)} 
                        question_data={this.props.question_data}
                      />
            })}
          </div>
      </section>
    )
  }
}

export default QuizQuestionHorizontalRadio
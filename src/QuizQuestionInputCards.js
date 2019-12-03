import React, { Component } from 'react'
import QuizQuestionInputCardButton from './QuizQuestionInputCardButton.js'
import QuizQuestionInputCard from './QuizQuestionInputCard.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'
import image from './img/placeholder-image.svg'


let quizData = require('./quiz_data.json')

class QuizQuestionInputCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: 0,
      sliderValues: [0, 0, 0, 0, 0],
      isIncomplete: null
    }
  }
  updateSectionValue(newValue, section, position) {
    this.props.updateSectionValue(newValue, section, position)
  }
  calculateTotal() {
    let scores = this.props.section_values
    
    for (let i = 0; i < this.props.quiz_question.sections.length; i++) {
      if (scores[i] === null) {
          this.setState({isIncomplete: true})
          return
        }
        else {
          this.setState({isIncomplete: false})
      }
    }

    let values = (this.props.quiz_position === 3 || this.props.quiz_position === 10) ? scores.slice() : scores.map(x => x * 2.5)

    for (let i = 0; i < values.length; i++) {
      if (values[i] === 2) {
        values[i] = 3;
      }
    }
    this.props.updateTotalValue(Math.round((values.reduce((a,b) => a + b, 0))/3));
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>
        {this.props.quiz_question.sections.map((section, index) => {
          return <QuizQuestionInputCard 
                   quiz_position={this.props.quiz_position}
                   key={index}
                   section={section} 
                   quiz_question={this.props.quiz_question}
                   currentSkillValue={this.props.currentSkillValue}
                   updateValue={this.updateSectionValue.bind(this)}
                   section_values={this.props.section_values}
                   />
        })}
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

export default QuizQuestionInputCards
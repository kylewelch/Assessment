import React, { Component } from 'react'
import QuizQuestionSliderCard from './QuizQuestionSliderCard.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'
import image from './img/placeholder-image.svg'


let quizData = require('./quiz_data.json')

class QuizQuestionSliderCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: 0,
      isIncomplete: null
    }
  }
  updateSectionValue(newValue, section, position) {
    this.props.updateSectionValue(newValue, section, position)
  }
  updateSliderValue(newValue, section) {
    this.props.updateSliderValue(newValue, section)
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

    let updatedValues = scores.map(updateValues)
    function updateValues(a) {
      if (a === 0) {
        return -2;
      } 
      else if (a === 1) {
        return -1;
      }
      else if (a === 2) {
        return 0;
      }
      else if (a === 3) {
        return 1;
      }
      else {
        return 2;
      }
    }

    let values = (updatedValues.reduce((a,b) => a + b, 0)) + (this.props.leader_values2.reduce((a,b) => a + b, 0))
    
    if (values < 0 ) {
      values = 0
    }
        
    this.props.updateTotalValue(Math.round(values/7));
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>
        {this.props.quiz_question.sections.map((section, index) => {
          return <QuizQuestionSliderCard 
                   quiz_position={this.props.quiz_position}
                   key={index}
                   section={section} 
                   quiz_question={this.props.quiz_question}
                   currentSkillValue={this.props.currentSkillValue}
                   updateValue={this.updateSectionValue.bind(this)}
                   updateSliderValue={this.updateSliderValue.bind(this)}
                   section_values={this.props.section_values}
                   slider_values={this.props.leader_values2}
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

export default QuizQuestionSliderCards
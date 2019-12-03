import React, { Component } from 'react'
import QuizQuestionCards from './QuizQuestionCards.js'
import QuizQuestionRadio from './QuizQuestionRadio.js'
import QuizQuestionMultiRadio from './QuizQuestionMultiRadio.js'
import QuizQuestionInputCards from './QuizQuestionInputCards.js'
import QuizQuestionSliderCards from './QuizQuestionSliderCards.js'
import QuizQuestionRadioCards from './QuizQuestionRadioCards.js'

let quizData = require('./quiz_data.json')

class QuizQuestion extends Component {
  constructor(props) {
    super(props)
    this.state={ incompleteAnswer: false }
  }
  updateAnswerValue(newValue) {
    this.props.updateValue(newValue)
  }
  updateAnswerSectionValue(newValue, section, position) {
    this.props.updateSectionValue(newValue, section, position)
  }
  updateAnswerSliderValue(newValue, section) {
    this.props.updateSliderValue(newValue, section)
  }
  showNextQuestion(newValue) {
    this.props.showNextQuestionHandler()
  }
  showPreviousQuestion(newValue) {
    this.props.showPreviousQuestionHandler()
  }
  render() {
    return (
      <main>
        <p className="sub-heading">{'Question ' + this.props.quiz_question.id + ' of 10'}</p>
        <h1 className="main-heading">
          {this.props.quiz_question.instruction_text}
          <span className="main-heading-skill">{this.props.quiz_question.skill_name}</span>{this.props.quiz_question.instruction_text2}
        </h1>
        {(this.props.quiz_question.question_type === "radio") ? 
          <QuizQuestionRadio 
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateValue={this.updateAnswerValue.bind(this)}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
            currentSkillValue={this.props.currentSkillValue} />
          : (this.props.quiz_question.question_type === "input-card") ? 
          <QuizQuestionInputCards 
            quiz_position={this.props.quiz_position}
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateSectionValue={this.updateAnswerSectionValue.bind(this)}
            updateTotalValue={this.updateAnswerValue.bind(this)}
            currentSkillValue={this.props.currentSkillValue}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
            section_values={this.props.section_values} /> 
          : (this.props.quiz_question.question_type === "slider-radio-card") ? 
          <QuizQuestionSliderCards 
            quiz_position={this.props.quiz_position}
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateSectionValue={this.updateAnswerSectionValue.bind(this)}
            updateSliderValue={this.updateAnswerSliderValue.bind(this)}
            updateTotalValue={this.updateAnswerValue.bind(this)}
            currentSkillValue={this.props.currentSkillValue}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
            section_values={this.props.section_values}
            leader_values2={this.props.leader_values2} /> 
          : (this.props.quiz_question.question_type === "radio-cards") ? 
          <QuizQuestionRadioCards 
            quiz_position={this.props.quiz_position}
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateSectionValue={this.updateAnswerSectionValue.bind(this)}
            updateTotalValue={this.updateAnswerValue.bind(this)}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
            currentSkillValue={this.props.currentSkillValue}
            section_values={this.props.section_values} />
          : (this.props.quiz_question.question_type === "multi-radio") ? 
          <QuizQuestionMultiRadio 
            quiz_position={this.props.quiz_position}
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateSectionValue={this.updateAnswerSectionValue.bind(this)}
            updateTotalValue={this.updateAnswerValue.bind(this)}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
            currentSkillValue={this.props.currentSkillValue}
            section_values={this.props.section_values} /> :
          <QuizQuestionCards 
            quiz_question={quizData.quiz_questions[this.props.quiz_position - 1]}
            value={0} 
            updateValue={this.updateAnswerValue.bind(this)}
            nav_text={quizData.nav_text[0]}
            showNextQuestionHandler={this.showNextQuestion.bind(this)}
            showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}/>}
        {this.state.incompleteAnswer ? <p className='error'>Select an answer before movin' on!</p> : null}
      </main>
    )
  }
}

export default QuizQuestion
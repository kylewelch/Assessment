import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'

let quizData = require('./quiz_data.json')

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      quiz_position: 1,
      quiz_finished: false}
  }
  updateAnswerSectionValue(newValue, section, position) {
    this.props.updateQuizSectionValue(newValue, section, position)
  }
  updateAnswerSliderValue(newValue, section) {
    this.props.updateQuizSliderValue(newValue, section)
  }
  updateAnswerValue(newValue) {
    let thisIteration = this.state.quiz_position - 1
    this.props.updateQuizValue(newValue, thisIteration)
  }
  showNextQuestion() {
    this.setState((state) => {
      return {quiz_position: state.quiz_position + 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  showPreviousQuestion() {
    this.setState((state) => {
      return {quiz_position: state.quiz_position - 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  handleResetClick() {
    this.setState({quiz_position: 1, quiz_finished: false})
    this.props.resetQuiz()
  }
  
  render() {
    const isQuizEnd = ((this.state.quiz_position -1) === this.props.selectedQuestions.length)
    let currentQuestionID = this.props.selectedQuestions[this.state.quiz_position - 1] + 1
    return (
      <div ref={this.ref}>
      {isQuizEnd ? 
        <QuizEnd 
          selectedQuestions={this.props.selectedQuestions}         
          resetClickHandler={this.handleResetClick.bind(this)} 
          unsorted_values={this.props.unsorted_values}
          skills={this.props.skill_values} 
          names={this.props.skill_names}
          full_names={this.props.full_names}
          shape={this.props.shape}
          deep_skills={this.props.deep_skills}
          level={this.props.level}
        /> : 
        <QuizQuestion
          quiz_position={this.state.quiz_position}
          quiz_question={quizData.quiz_questions[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          selectedQuestions={this.props.selectedQuestions}
          value={0} 
          currentSkillValue={this.props.unsorted_values[this.state.quiz_position - 1]}
          updateSectionValue={this.updateAnswerSectionValue.bind(this)}
          updateSliderValue={this.updateAnswerSliderValue.bind(this)}
          updateValue={this.updateAnswerValue.bind(this)}
          showNextQuestionHandler={this.showNextQuestion.bind(this)}
          showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
          section_values={(currentQuestionID === 3) ? this.props.research_values : (currentQuestionID === 4) ? this.props.motion_values : (currentQuestionID === 5) ? 
          this.props.leader_values : (currentQuestionID === 6) ? this.props.illustration_values :(currentQuestionID === 7) ? this.props.writing_values : (currentQuestionID === 9) ? this.props.tech_values : this.props.ops_values} 
          leader_values2={this.props.leader_values2} /> }

      </div>
    )
  }
}

export default Quiz
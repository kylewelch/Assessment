import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'
import QuizPreview from './QuizPreview.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let quizData = require('./quiz_data.json')
const assessmentID = window.location.pathname.substr(12);
const db = firebase.firestore();

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      quiz_position: 1,
      quiz_finished: false,
      test: window.location.pathname.substr(12),
      name: ''}
  }
  componentDidMount() {
    const AssessName = db.collection("assessments").doc(assessmentID).get("name");
    this.setState({name: AssessName})
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
  updateSubskills(value, section, id) {
    this.props.updateSubskills(value, section, id)
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
  showQuiz() {
    this.props.showQuiz();
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  storeImage(image) {
    this.props.storeImage(image)
  }
  render() {
    const showPreview = this.props.showPreview
    const isQuizEnd = ((this.state.quiz_position -1) === this.props.selectedQuestions.length)
    let currentQuestionID = this.props.selectedQuestions[this.state.quiz_position - 1] + 1
    return (
      <div ref={this.ref}>
      {/*showPreview ? 
          <QuizPreview 
            selectedQuestions={this.props.selectedQuestions}         
            resetClickHandler={this.handleResetClick.bind(this)} 
            unsorted_values={this.props.unsorted_values}
            skills={this.props.skill_values} 
            names={this.props.skill_names}
            selectedNames={this.props.selectedNames}
            full_names={this.props.full_names}
            shape={this.props.shape}
            deep_skills={this.props.deep_skills}
            level={this.props.level}
            showQuiz={this.showQuiz.bind(this)}
            assessmentID={this.props.assessmentID}
          />
          :*/ 
          
      isQuizEnd ? 
        <QuizEnd 
          selectedQuestions={this.props.selectedQuestions} 
          selectedNames={this.props.selectedNames}
          resetClickHandler={this.handleResetClick.bind(this)} 
          unsorted_values={this.props.unsorted_values}
          skills={this.props.skill_values} 
          names={this.props.skill_names}
          full_names={this.props.full_names}
          subskillNames={this.props.subskillNames}
          subskills={this.props.subskills}
          image={this.props.image}
        /> : 
        <QuizQuestion
          quiz_position={this.state.quiz_position}
          quiz_question={quizData.quiz_questions[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          selectedQuestions={this.props.selectedQuestions}
          value={0} 
          currentSkillValue={this.props.unsorted_values[this.state.quiz_position - 1]}
          updateSectionValue={this.updateAnswerSectionValue.bind(this)}
          updateSliderValue={this.updateAnswerSliderValue.bind(this)}
          updateSubskills={this.updateSubskills.bind(this)}
          updateValue={this.updateAnswerValue.bind(this)}
          showNextQuestionHandler={this.showNextQuestion.bind(this)}
          showPreviousQuestionHandler={this.showPreviousQuestion.bind(this)}
          section_values={(currentQuestionID === 3) ? this.props.research_values : (currentQuestionID === 4) ?  this.props.writing_values : (currentQuestionID === 1) ?  this.props.visual_values : this.props.ops_values} 
          leader_values2={this.props.leader_values2} 
          subskills={this.props.subskills[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          storeImage={this.storeImage.bind(this)}
          image={this.props.image}
        /> }

      </div>
    )
  }
}

export default Quiz
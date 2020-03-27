import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'
import firebase from './Firebase.js'
import QuizPreview from './QuizPreview.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const quizData = require('./quiz_data.json')

// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      quiz_position: 1,
      quiz_finished: false,
      test: window.location.pathname.substr(12),
      questions: null,
      name: ''}
  }
  componentDidMount() {
    let thisAssessment = db.collection("assessments").doc(window.location.pathname.substr(12));
    thisAssessment.get().then((doc) => {
        let questions = doc.data().questions;
        this.setState({questions: questions});
        this.props.setSelectedQuestions(questions);
    });
    {/*let questionsOne = thisAssessment.get().then(function(doc) {
      return doc.data().questions;
    })
    let questionsTwo = thisAssessment
    console.log(questionsOne);
  this.setState({test2: questionsOne})*/}
  }
  updateAnswerSectionValue(newValue, section, question, position) {
    this.props.updateQuizSectionValue(newValue, section, question, position)
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
  showSpecificQuestion(question) {
    this.setState({quiz_position: question})
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
  storeImage(image, number) {
    this.props.storeImage(image, number, this.props.selectedQuestions[this.state.quiz_position - 1])
  }
  removeImage(number, question) {
    this.props.removeImage(number, question);
  }
  deleteImage(number, question) {
    this.props.deleteImage(number, question);
  }
  deleteUploadText(number, question) {
    this.props.deleteUploadText(number, question);
  }
  updateTextInput(name, value, number, question) {
    this.props.updateTextInput(name, value, number, question)
  }
  updateLinkValue(name, value) {
    this.props.updateLinkValue(name, value)
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
          assessmentID={this.props.assessmentID}
          selectedQuestions={this.props.selectedQuestions} 
          unsorted_values={this.props.unsorted_values}
          skills={this.props.skill_values} 
          names={this.props.skill_names}
          image={this.props.image}
          imageTitle={this.props.imageTitle}
          imageDescription={this.props.imageDescription}
          uxURL={this.props.uxURL}
          researchURL={this.props.researchURL}
          codingURL={this.props.codingURL}
          uxCaseStudy={this.props.uxCaseStudy}
          researchCaseStudy={this.props.researchCaseStudy}
          opsText={this.props.opsText}
          showSpecificQuestion={this.showSpecificQuestion.bind(this)}
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
          removeImage={this.removeImage.bind(this)}
          deleteImage={this.deleteImage.bind(this)}
          deleteUploadText={this.deleteUploadText.bind(this)}
          image={this.props.image[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          imageTitle={this.props.imageTitle[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          imageDescription={this.props.imageDescription[this.props.selectedQuestions[this.state.quiz_position - 1]]}
          updateTextInput={this.updateTextInput.bind(this)}
          updateLinkValue={this.updateLinkValue.bind(this)}
          uxURL={this.props.uxURL}
          researchURL={this.props.researchURL}
          codingURL={this.props.codingURL}
          uxCaseStudy={this.props.uxCaseStudy}
          researchCaseStudy={this.props.researchCaseStudy}
          opsText={this.props.opsText}
        /> }

      </div>
    )
  }
}

export default Quiz
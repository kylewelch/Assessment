import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import CaseStudy from './CaseStudy.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionRadio extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null,
    }
  }
  handleClick(value) {
    this.props.updateValue(value)
  }
  updateSubskills(value, section, id) {
    this.props.updateSubskills(value, section, id)
  }
  storeImage(image) {
    this.props.storeImage(image);
  }
  showUploadPage() {
    this.props.showUploadPage()
  }
  editUpload(index) {
    this.props.editUpload(index)
  }
  updateLinkValue(name, value) {
    this.props.updateLinkValue(name, value)
  }
  updateTextInput(name, value, number, question) {
    this.props.updateTextInput(name, value, number, question)
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
        {this.props.quiz_question.answer_options.map((answer_option, index) => {
          return <QuizQuestionRadioButton 
                    key={index} 
                    index={index}
                    answer_text={answer_option} 
                    isChecked={(this.props.currentSkillValue === index)}
                    clickHandler={this.handleClick.bind(this)} 
                    question_data={this.props.quiz_question} 
                  />
          })}
        {this.props.currentSkillValue ? 
          <div className="follow-up-section">
            {/*this.props.quiz_question.skip_subskills ? null :
              <div>
                <h2>How much experience do you have with the following:</h2>
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
              </div>21
              */}

            { // If it's the UX question, show the case study form
            
            (this.props.quiz_question.id === 2) ? 
            <CaseStudy 
              quiz_question={this.props.quiz_question}
              updateTextInput={this.updateTextInput.bind(this)}
              updateLinkValue={this.updateLinkValue.bind(this)}
              caseStudy={this.props.caseStudy}
              url={this.props.url}
            /> : null}

            <Upload 
              quiz_question={this.props.quiz_question}
              skills={this.props.quiz_question.subskills}
              storeImage={this.storeImage.bind(this)}
              image={this.props.image} 
              imageTitle={this.props.imageTitle}
              imageDescription={this.props.imageDescription}
              showUploadPage={this.showUploadPage.bind(this)} 
              editUpload={this.editUpload.bind(this)} 
              updateLinkValue={this.updateLinkValue.bind(this)}  
              url={this.props.url}
              currentSkillValue={this.props.currentSkillValue}        
            />
          </div> : null
        }
      {this.state.isIncomplete ? <Validation /> : null}
      <div className="nav-section">
        <NavButton 
          button_text={this.props.nav_text} 
          className=" nav-btn-secondary"
          clickHandler={this.showPreviousQuestion.bind(this)} 
        />
        <NavButton 
          button_text={this.props.quiz_question} 
          className=" "
          clickHandler={this.showNextQuestion.bind(this)} 
        />
      </div>
      </section>
    )
  }
}

export default QuizQuestionRadio
import React, { Component } from 'react'
import CardButton from './CardButton.js'
import CaseStudy from './CaseStudy.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class CardsAndSliders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.slider_values[this.props.section],
      isIncomplete: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({sliderValue: parseFloat(event.target.value)})
    this.props.updateSectionValue(parseFloat(event.target.value), 2, this.props.quiz_question.id, this.props.quiz_position - 1)
  }
  handleClick(value) {
    this.props.updateValue(value)
  }
  updateSubskills(value, section, id) {
    this.props.updateSubskills(value, section, id)
  }
  updateSectionValue(value, section, question, position) {
    this.props.updateSectionValue(value, section, question, position);
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
  updateTextArea(e) {
    this.props.updateTextInput(e.target.name, e.target.value, "ops", this.props.quiz_question.id)
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
        {this.props.quiz_question.question_text.map((question, index1) => {
          return (
            <div className="card-button-section" key={question}>
              <p className="input-card-question">{question}</p>
              <div className="click-card-grid"> 
                {this.props.quiz_question.answer_description[index1].map((option, index) => {
                  return <CardButton 
                            key={index} 
                            index={index}
                            answer_option={this.props.quiz_question.answer_options[index1][index]}
                            answer_text={option}
                            question_data={this.props.quiz_question}
                            section={index1}
                            isChecked={(this.props.sectionValues[index1] === index)}
                            clickHandler={this.updateSectionValue.bind(this)}
                            quiz_position={this.props.quiz_position}  /*
                            isChecked={(this.props.currentSkillValue === index)}
                            question_data={this.props.quiz_question} */
                          />
                  })}
              </div>
            </div>
          )})} 
        <p className="input-card-question">{this.props.quiz_question.slider_question}</p>
        <div className="slidecontainer">
          <p className="slider-value">{this.props.sectionValues[2]}{(this.state.sliderValue == 5) ? "+" : null} year{(this.state.sliderValue == 1) ? "" : "s"} of experience</p>
          <input 
            type="range" 
            min="0" 
            max="5" 
            value={this.props.sectionValues[2]} 
            step=".5" 
            onChange={this.handleChange.bind(this)} 
            className="slider" 
          />
        </div>

        {(this.props.quiz_question.id === 6) ? 
          <div>
            <p className="input-card-question">What’s an example of something you did that improved the output of a design team you were on? <span className="lighter-text">(optional, but encouraged)</span></p>
            <textarea
              name="OpsQuestion"
              className="text-field"
              onChange={this.updateTextArea.bind(this)}
              value={this.props.opsText} />
          </div>
          : null}

        {(this.props.currentSkillValue && this.props.quiz_question.id === 4) ? 
          <div className="follow-up-section">

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

export default CardsAndSliders
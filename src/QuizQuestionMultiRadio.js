import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'
import QuizQuestionHorizontalRadio from './QuizQuestionHorizontalRadio.js'
import Upload from './Upload.js'
let quizData = require('./quiz_data.json')

class QuizQuestionMultiRadio extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null
    }
  }
  handleClick(buttonText, section, position) {
    this.props.updateSectionValue(buttonText, section, position)
  }
  updateSubskills(value, section, id) {
    this.props.updateSubskills(value, section, id)
  }
  calculateTotal() {
    let scores = this.props.section_values
    
    for (let i = 0; i < 2; i++) {
      if (scores[i] === null) {
          this.setState({isIncomplete: true})
          return
        }
        else {
          this.setState({isIncomplete: false})
      }
    }
    this.props.updateTotalValue((scores.reduce((a,b) => a + b, 0)));
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>   
        <p className="input-card-question">{this.props.quiz_question.question1}</p>
        {this.props.quiz_question.answer_options.map((answer_option, index) => {
          return <QuizQuestionRadioButton 
                    key={index}
                    section={0}
                    index={index}
                    answer_text={answer_option} 
                    isChecked={(this.props.section_values[0] === index)}
                    clickHandler={this.handleClick.bind(this)} 
                    question_data={this.props.quiz_question} 
                    quiz_position={this.props.quiz_position}
                  />
          })}
        <p className="input-card-question">{this.props.quiz_question.question2}</p>
        {this.props.quiz_question.answer_options2.map((answer_option, index) => {
          return <QuizQuestionRadioButton 
                    key={index}
                    section={1}
                    index={index}
                    answer_text={answer_option} 
                    isChecked={(this.props.section_values[1] === index)}
                    clickHandler={this.handleClick.bind(this)} 
                    question_data={this.props.quiz_question} 
                    quiz_position={this.props.quiz_position}
                  />
          })}
          
          <div className="follow-up-section">
            <h2>How skilled are you at: </h2>
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

export default QuizQuestionMultiRadio
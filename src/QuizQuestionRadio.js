import React, { Component } from 'react'
import QuizQuestionRadioButton from './QuizQuestionRadioButton.js'
import QuizQuestionHorizontalRadio from './QuizQuestionHorizontalRadio.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'
import Validation from './QuizQuestionValidation.js'

let quizData = require('./quiz_data.json')

class QuizQuestionRadio extends Component {
  constructor(props) {
    super(props)
    this.state={
      isIncomplete: null
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
            {this.props.quiz_question.skip_subskills ? null :
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
              </div>
            }
            <Upload 
              quiz_question={this.props.quiz_question}
              skills={this.props.quiz_question.subskills}
              storeImage={this.storeImage.bind(this)}
              image={this.props.image}             
            />
          </div> : null
        }
      {this.state.isIncomplete ? <Validation /> : null}
      <NavButton 
        button_text={this.props.quiz_question} 
        className=" "
        clickHandler={this.showNextQuestion.bind(this)} />
      <NavButton 
        button_text={this.props.nav_text} 
        className=" nav-btn-secondary"
        clickHandler={this.showPreviousQuestion.bind(this)} />
      </section>
    )
  }
}

export default QuizQuestionRadio
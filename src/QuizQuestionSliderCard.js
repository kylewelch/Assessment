import React, { Component } from 'react'
import EmojiButton from './EmojiButton.js'
import NavButton from './NavButton.js'
import image from './img/placeholder-image.svg'

let quizData = require('./quiz_data.json')

class QuizQuestionSliderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {sliderValue: this.props.slider_values[this.props.section]}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({sliderValue: parseFloat(event.target.value)})
    this.props.updateSliderValue(parseFloat(event.target.value), this.props.section)
  }
  handleClick(buttonText, section, position) {
    this.props.updateValue(buttonText, section, position) 
  }
  showNextQuestion() {
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    return (        
      <section>
        <div className="input-card">
          <div className="input-card-image-container">
            <img src={image} alt="temporary placeholder icon" />
          </div>
          <div className="input-card-content">
            <p className="input-card-question">{this.props.quiz_question.section_text[this.props.section]}</p>
            <div className="slidecontainer">
              <p className="slider-value">{this.state.sliderValue}{(this.state.sliderValue == 5) ? "+" : null} year{(this.state.sliderValue == 1) ? "" : "s"} of experience</p>
              <input 
                type="range" 
                min="0" 
                max="5" 
                value={this.props.slider_values[this.props.section]} 
                step=".5" 
                onChange={this.handleChange} 
                className="slider" />
            </div>
            <div className="input-card-button-container">
              {this.props.quiz_question.answer_options.map((answer_option, index) => {
                return <EmojiButton 
                          quiz_position={this.props.quiz_position}
                          key={index}
                          answer_option={answer_option}
                          isChecked={(this.props.section_values[this.props.section] === index)}
                          clickHandler={this.handleClick.bind(this)} 
                          question_data={this.props.quiz_question} 
                          section={this.props.section} 
                          section_values={this.props.section_values}
                        />
                })}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default QuizQuestionSliderCard
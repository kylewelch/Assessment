import React, { Component } from 'react'
import visual from './img/visual.svg'
import ux from './img/ux.svg'
import research from './img/research.svg'
import writing from './img/writing.svg'
import code from './img/code.svg'
import ops from './img/ops.svg'
const icons = [visual, ux, research, writing, code, ops]
const names = ['Visual Design', 'UX Design', 'UX Research', 'Writing', 'Code', 'DesignOps']

let introData = require('./intro_data.json')

class Intro extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  showPrevious() {
    this.props.showPreviousIntroPage();
  }
  showNext() {
    this.props.showNextIntroPage();
  }
  startQuiz() {
    this.props.startQuiz();
  }
  updateTextInput(e) {
    this.props.updateTextInput(e.target.name, e.target.value, "intro", null);
  }
  render() { 
    return (
        <main className="intro-container">
          {(this.props.introPage === 1) ?
          <div>
            <h1 className="main-heading">You already know how good you are.<br />Now you can finally prove it.</h1>
            <p className="intro-subheading">This assessment is designed to help you showcase your skills in 6 different areas:</p>
            <div className="skill-preview-container">
              {this.props.selectedQuestions.map((question, index) => {
                return (
                  <div className="skill-preview">
                    <img src={icons[question]} />
                    <p className="skill-preview-text">{this.props.skillFullNames[question]}</p>
                  </div>
                )
              })}
            </div>
            <button className="nav-btn" onClick={this.showNext.bind(this)}>Let's do it</button>
          </div>
          :
          <div>
          <h1 className="main-heading">First, a bit about you:</h1>
          <div className="input-area">
            <p className="input-label">FIRST AND LAST NAME</p>
            <input 
              className="text-input user-input" 
              type="text" 
              name={0}
              placeholder="Name" 
              value={this.props.contactInfo[0]}
              onChange={this.updateTextInput.bind(this)}
              />
          </div>
          <div className="input-area">
            <p className="input-label">EMAIL ADDRESS</p>
            <input 
              className="text-input email-input" 
              type="email" 
              name={1} 
              placeholder="Email"  
              value={this.props.contactInfo[1]}
              onChange={this.updateTextInput.bind(this)}
              />
          </div>
          <div className="input-area">
            <p className="input-label">PORTFOLIO LINK</p>
            <input 
              className="text-input url-input" 
              type="url" 
              name={2}
              placeholder="Portfolio"  
              value={this.props.contactInfo[2]}
              onChange={this.updateTextInput.bind(this)}
              />
          </div>
          <div className="nav-section">
            <button className="nav-btn nav-btn-secondary" onClick={this.showPrevious.bind(this)}>Previous</button>
            <button className="nav-btn" onClick={this.startQuiz.bind(this)}>Next</button>
          </div>
        </div>}
        </main>
    )
  }
}

export default Intro
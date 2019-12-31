import React, { Component } from 'react'
import Checkbox from './Checkbox.js'
import SubskillBar from './SubskillBar.js'
let quizData = require('./quiz_data.json')
let introData = require('./intro_data.json')

class Subskill extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() { 
    return (
      <div className="subskill-section">
        <h2>{this.props.names[0][this.props.index]}</h2>
        <div className="subskill-container">
          <div className="subskill-container-section">
            <h3>Experience</h3>
            {this.props.subskills.map((skill, index) => {
              return <SubskillBar 
                       skill={skill}
                       index={index}
                       skills={this.props.skills}
                       names={[this.props.names]}
                       subskillName={quizData.quiz_questions[this.props.selectedQuestion].subskills[index]}
                       subskill={this.props.subskills[index]}
                       selectedQuestion={this.props.selectedQuestion}
                       />
            })}
          </div>
          <div className="subskill-container-section">
            <h3>Work Samples</h3>
            <div className="subskill-empty-image">No samples uploaded</div>
          </div>
        </div>       
      </div>
    )
  }
}

export default Subskill
import React, { Component } from 'react'
let quizData = require('./quiz_data.json')

class SubskillBar extends Component {
  render() {
    const barLength = {
      width: (100 * this.props.subskill) / ((quizData.quiz_questions[this.props.selectedQuestion].question_type === "input-card") ? 2 : 4) + '%'
    };
    const levels = ["No experience", "Beginner", "Proficient", "Expert", "World Class"];
    return(
      <div className="progress-bar-section">
        <p className="progress-bar-name">{this.props.subskillName}</p>
        <div className="progress-bar-container">
          <div className="prog-bar-bg">
            <div className="prog-bar" style={barLength}></div>
          </div>
          <p className="prog-bar-skill-level">{levels[this.props.subskill]}</p>
        </div>
      </div>
    );
  }
}

export default SubskillBar;

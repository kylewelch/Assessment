import React, { Component } from 'react'
import check from './img/check.svg'
let quizData = require('./quiz_data.json')

class Checkbox extends Component {
  handleClick() {
    this.props.selectItem(this.props.index)
  }
  render() { 
    return (
      <div className={this.props.isChecked ? "skill-list-item selected-item" : "skill-list-item"} onClick={this.handleClick.bind(this)}>
        <div className="skill-list-item-name">
          <div className="circle-icon"></div>
          <div>
            <p className="skill-list-core-skill">{this.props.name}</p>
            <p className="skill-list-subskill">{quizData.quiz_questions[this.props.index].subskills.join(", ")}</p>
          </div>
        </div>
        <div className={this.props.isChecked ? "skill-list-item-check checked-item" : "skill-list-item-check"}><img src={check}/></div>
      </div>
    )
  }
}

export default Checkbox
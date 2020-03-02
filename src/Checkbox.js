import React, { Component } from 'react'
import check from './img/check.svg'
import visual from './img/visual.svg'
import ux from './img/ux.svg'
import research from './img/research.svg'
import writing from './img/writing.svg'
import code from './img/code.svg'
import ops from './img/ops.svg'
const icons = [visual, ux, research, writing, code, ops]
let quizData = require('./quiz_data.json')

class Checkbox extends Component {
  handleClick() {
    this.props.selectItem(this.props.index)
  }
  render() { 
    return (
      <div className={this.props.isChecked ? "skill-list-item selected-item" : "skill-list-item"} onClick={this.handleClick.bind(this)}>
        <div className={this.props.isChecked ? "skill-list-item-name" : "skill-list-item-name skill-list-item-unselected"}>
          <div className="circle-icon"><img src={icons[this.props.index]} /></div>
          <div>
            <p className="skill-list-core-skill">{this.props.name}</p>
            <p className="skill-list-subskill">{quizData.quiz_questions[this.props.index].subskills.join(", ")}</p>
          </div>
        </div>
        <div className={this.props.isChecked ? "skill-list-item-check checked-item" : "skill-list-item-check"}>{this.props.isChecked ? <img src={check}/> : null}</div>
      </div>
    )
  }
}

export default Checkbox
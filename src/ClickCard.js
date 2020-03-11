import React, { Component } from 'react'
import popup from './img/popup.svg'

class ClickCard extends Component {
  handleClick() {
    this.props.updateStatus(0, this.props.index, this.props.quiz_question.id, this.props.quiz_position - 1) 
  }
  render() {
    return (
      <div className="click-card" onClick={this.handleClick.bind(this)}>
        {this.props.status ? <div className={(this.props.status === 1) ? "click-card-experience-bar" : "click-card-experience-bar full-bar"}></div> : null}
        {(this.props.click === 1 && this.props.status == 1) ? <img className="click-card-popup" src={popup} /> : null}
        <div className={this.props.status ? "click-card-title click-card-title-experienced" : "click-card-title"}>{this.props.methods}</div>
        <div className={(this.props.status === 2) ? "click-card-experience click-card-experience-high" : "click-card-experience"}>{(this.props.status === 2) ? 'VERY EXPERIENCED' : (this.props.status === 1) ? 'EXPERIENCED' : null}</div>
      </div>
    )
  }
}

export default ClickCard
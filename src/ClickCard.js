import React, { Component } from 'react'
import popup from './img/popup.svg'

class ClickCard extends Component {
  handleClick() {
    this.props.updateStatus(0, this.props.index, this.props.quiz_question.id) 
  }
  render() {
    return (
      <div className={(this.props.quiz_question.id === 6) ? "click-card click-card-large" : "click-card"} onClick={this.handleClick.bind(this)}>
        {(this.props.click === 1 && this.props.status == 1) ? <img className="click-card-popup" src={popup} /> : null}
        <div className="click-card-image"></div>
        <div className="click-card-title">{this.props.methods}</div>
        <div className={(this.props.status === 2) ? "click-card-experience click-card-experience-high" : "click-card-experience"}>{(this.props.status === 2) ? 'very experienced' : (this.props.status === 1) ? 'experienced' : null}</div>
      </div>
    )
  }
}

export default ClickCard
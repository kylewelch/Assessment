import React, { Component } from 'react'
import empty from './img/emptySample.svg'

class EmptyStateManagerView extends Component {
  showSpecificQuestion() {
    this.props.showSpecificQuestion(this.props.index + 1);
  }
  render() {
    return (
      <div className="empty-sample-container">
        <img src={empty} />
        <div className="empty-sample-text-area">
          <p className="empty-sample-text">{(this.props.skill === 0) ? "No visual design samples provided." : (this.props.skill === 1) ? "No UX case study provided." : (this.props.skill === 2) ? "No research case study provided." : (this.props.skill === 3) ? "No writing samples provided." : (this.props.skill === 4) ? "No code samples provided." : null}</p>
        </div>
    </div>
   )
  }
}

export default EmptyStateManagerView
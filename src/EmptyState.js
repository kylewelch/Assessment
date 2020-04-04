import React, { Component } from 'react'
import empty from './img/emptySample.svg'

class EmptyState extends Component {
  showSpecificQuestion() {
    this.props.showSpecificQuestion(this.props.index + 1);
  }
  render() {
    return (
      <div className="empty-sample-container">
        <img src={empty} />
        <div className="empty-sample-text-area">
          <p className="empty-sample-text">Looks like you haven't added {(this.props.skill === 0) ? "any visual design samples yet." : (this.props.skill === 1) ? "a UX case study yet." : (this.props.skill === 2) ? "a research case study yet." : (this.props.skill === 3) ? "any writing samples. (Which is fine. It's totally optional)." : (this.props.skill === 4) ? "any code samples. (Which is fine. It's totally optional)." : null}</p>
          <p className={(this.props.skill === 1 || this.props.skill === 2) ? "results-outline-button results-outline-button-two" : "results-outline-button"} onClick={this.showSpecificQuestion.bind(this)}>Add {(this.props.skill === 1 || this.props.skill === 2) ? "Case Study" : "Sample"}</p>
        </div>
    </div>
   )
  }
}

export default EmptyState
import React, { Component } from 'react'
import EmptyState from './EmptyState.js'
import EmptyStateManagerView from './EmptyStateManagerView.js'
import arrow from './img/arrow.svg'


class CaseStudyPreview extends Component {
  openModal() {
    this.props.openModal(this.props.index);
  }
  showSpecificQuestion(question) {
    this.props.showSpecificQuestion(question);
  }
  
  render() {
    return (
      <div>
      {this.props.caseStudy[0] ?

        <div className="case-study-container">
          <div className="case-study-preview" onClick={this.openModal.bind(this)}>
            <p className="case-study-title">{this.props.caseStudy[0]}</p>
            <p className="case-study-description">{this.props.skill === 1 ? "UX " : "Research "} Case Study</p>
          </div>
          <div className="case-study-cta">
            <p>View Details</p>
            <img className="arrow" src={arrow} />
          </div>
        </div>
        : 
        this.props.link ?
        <div>
          <p className="empty-sample-text">{this.props.skill === 1 ? "UX Case Study" : "Research Case Study"}</p>
          <a href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.link}</a>
        </div>
        :
        this.props.managerView ?

        <EmptyStateManagerView 
          skill={this.props.skill}
          index={this.props.index}
          showSpecificQuestion={this.showSpecificQuestion.bind(this)} 
        />
        :
        <EmptyState 
          skill={this.props.skill}
          index={this.props.index}
          showSpecificQuestion={this.showSpecificQuestion.bind(this)} 
        />
        }
    </div>
   )
  }
}

export default CaseStudyPreview
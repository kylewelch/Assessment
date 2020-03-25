import React, { Component } from 'react'
import EmptyState from './EmptyState.js'
import arrow from './img/arrow.svg'
import UploadPreview from './UploadPreview.js'
import upload from './img/upload.svg'
import add from './img/add.svg'
import view from './img/view.svg'
import testImg from './img/testImage.jpg'

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
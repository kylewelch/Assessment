import React, { Component } from 'react'

class CaseStudy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploaded: false
    }
  }

  updateLinkValue(e) {
    this.props.updateLinkValue(e.target.name, e.target.value)
  }
  updateCaseStudyValue(e) {
    const number = (this.props.quiz_question.id === 2) ? "ux" : "research";
    this.props.updateTextInput(e.target.name, e.target.value, number, this.props.quiz_question.id)
  }

  render() {
    return (
    <div className="upload-container">
      <h2>{this.props.quiz_question.followup}</h2>
      <div className="case-study-card">
        <h3>Option 1</h3>
        <p>Provide a link to a case study you've already made:</p>
        <input
              type="url/"
              name={(this.props.quiz_question.id === 2) ? "uxURL" : "researchURL"}
              className="text-input url-input dark-field"
              onChange={this.updateLinkValue.bind(this)}
              value={this.props.url} />
      </div>

      <h3 className="spaced-text">Or</h3>

      <div className="case-study-card">
        <h3>Option 2</h3>
        <p>Create a quick and easy case study below</p>

        <p className="text-label">Project Name</p>
        <input
          type="text"
          name={0}
          className="text-field dark-field"
          onChange={this.updateCaseStudyValue.bind(this)}
          value={this.props.caseStudy[0]} />

        <p className="text-label">Project Goal (the problem you were trying to solve)</p>
        <textarea
          name={1}
          className="text-field dark-field"
          onChange={this.updateCaseStudyValue.bind(this)}
          value={this.props.caseStudy[1]} />

        <p className="text-label">My role in the project</p>
        <textarea
          name={2}
          className="text-field dark-field"
          onChange={this.updateCaseStudyValue.bind(this)}
          value={this.props.caseStudy[2]} />
          
        <p className="text-label">My process for studying the problem and designing a solution</p>
        <textarea
          name={3}
          className="text-field dark-field"
          onChange={this.updateCaseStudyValue.bind(this)}
          value={this.props.caseStudy[3]} />

        <p className="text-label">Project outcome and results</p>
        <textarea
          name={4}
          className="text-field dark-field"
          onChange={this.updateCaseStudyValue.bind(this)}
          value={this.props.caseStudy[4]} />
      </div>
      <p className="text-label text-margin">Upload any diagrams, wireframes, or other deliverables from the project that you would like to add</p>
    </div>
    )
  }
}

export default CaseStudy
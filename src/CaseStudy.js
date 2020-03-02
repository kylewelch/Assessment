import React, { Component } from 'react'

class CaseStudy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploaded: false
    }
  }

  updateValue(e) {
    const uploadNumber = (this.props.image.length - 1)
    this.props.updateTextInput(e.target.name, e.target.value, uploadNumber, this.props.quizPosition - 1)
  }

  render() {
    return (
    <div className="upload-container">
      <h2>{this.props.quiz_question.followup}</h2>
      <h3>Option 1</h3>
      <p>Provide a link to a case study you've already made:</p>
      <input
            type="url/"
            name="caseStudyLink"
            className="text-field"
            onChange={this.updateValue.bind(this)}
            value={""} />
      <h3>Or</h3>
      <h3>Option 2</h3>
      <p>Create a quick and easy case study below</p>

      <p className="text-label">Project Name</p>
      <input
        type="text"
        name="imageTitle"
        className="text-field"
        onChange={this.updateValue.bind(this)}
        value={""} />

      <p className="text-label">Project Goal (the problem you were trying to solve)</p>
      <textarea
        name="imageDescription"
        className="text-field"
        onChange={this.updateValue.bind(this)}
        value={""} />

      <p className="text-label">My role in the project</p>
      <textarea
        name="imageDescription"
        className="text-field"
        onChange={this.updateValue.bind(this)}
        value={""} />
        
      <p className="text-label">My process for studying the problem and designing a solution</p>
      <textarea
        name="imageDescription"
        className="text-field"
        onChange={this.updateValue.bind(this)}
        value={""} />

      <p className="text-label">Project outcome and results</p>
      <textarea
        name="imageDescription"
        className="text-field"
        onChange={this.updateValue.bind(this)}
        value={""} />

      <p className="text-label">Upload any diagrams, wireframes, or other deliverables from the project that you would like to add</p>
    </div>
    )
  }
}

export default CaseStudy
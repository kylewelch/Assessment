import React, { Component } from 'react'
import Carousel from './Carousel.js'
import CaseStudyPreview from './CaseStudyPreview.js'
import Modal from './Modal.js'
import EmptyState from './EmptyState.js'
import EmptyStateManagerView from './EmptyStateManagerView.js'
import visual from './img/visual.svg'
import ux from './img/ux.svg'
import research from './img/research.svg'
import writing from './img/writing.svg'
import code from './img/code.svg'
import ops from './img/ops.svg'
const icons = [visual, ux, research, writing, code, ops]
let blankBlocks = ["visual-block", "ux-block", "research-block", "writing-block", "code-block", "ops-block"];
let filledBlocks = ["visual-block-filled", "ux-block-filled", "research-block-filled", "writing-block-filled", "code-block-filled", "ops-block-filled"];
let quizData = require('./quiz_data.json')


// Single block component


function Block(props) {
  return <div className={"skill-grid-col-block skill-row-block " + props.value}></div>
}


// Row component


class Row extends React.Component {
  renderBlock(i) {
    return (
      <Block 
        value={(i < this.props.skillLevel) ? filledBlocks[this.props.selectedQuestion] : ('skill-blank ' + blankBlocks[this.props.selectedQuestion])}
        index={i}
      />
    );
  }
  
  render() {
    let col = [];
    for (let i = 0; i < 5; ++i) {
      col.push(this.renderBlock(i));
    }

    return (
      <div className="skill-row">
        {col}
      </div>
    );
  }
}

class Subskill extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  showSpecificQuestion(question) {
    this.props.showSpecificQuestion(question);
  }
  openModal(skill, image) {
    this.props.openModal(skill, image);
  }
  closeModal() {
    this.props.closeModal();
  }
  render() { 
    return (
      <div className="subskill-section">
        {(this.props.modal === this.props.index) ? 
          <Modal 
            skill={this.props.skill}
            modal={this.props.modal}
            modalImage={this.props.modalImage}
            openModal={this.openModal.bind(this)}
            closeModal={this.closeModal.bind(this)}
            index={this.props.index}
            caseStudyImage={this.props.image}
            caseStudyImageTitle={this.props.imageTitle}
            caseStudyImageDescription={this.props.imageDescription}
            image={this.props.image[this.props.modalImage]}
            imageTitle={this.props.imageTitle[this.props.modalImage]}
            imageDescription={this.props.imageDescription[this.props.modalImage]}
            caseStudy={(this.props.skill === 1) ? this.props.uxCaseStudy : this.props.researchCaseStudy}
          /> : null}
        <div className={this.props.skill === 5 ? "subskill-container-long" : "subskill-container"}>
          <div className="subskill-container-section">
            <div className="subskill-title-container">
              <div className="circle-icon circle-small"><img className="icon-small" src={icons[this.props.selectedQuestion]} /></div>
              <p className="subskill-title">{quizData.quiz_questions[this.props.selectedQuestion].skill_name}</p>
            </div>
            <p className="progress-bar-name">{quizData.quiz_questions[this.props.selectedQuestion].subskills.join(", ")}</p>
            <Row 
              index={this.props.index}
              skillLevel={this.props.unsortedSkills[this.props.index]}
              selectedQuestion={this.props.selectedQuestion}
            />
          </div>
          <div className="divider"></div>

          <div className="subskill-container-section subskill-container-section-two">
            
            { // <p className={"results-outline-button results-outline-button-three"}>Edit</p>
              // if a sample has been uploaded for this skill, show the sample(s)
            (this.props.skill === 0 || this.props.skill === 3) ? 
              <Carousel 
                image={this.props.image}
                openModal={this.openModal.bind(this)}
                index={this.props.index}
                skill={this.props.skill}
                showSpecificQuestion={this.showSpecificQuestion.bind(this)}
                managerView={this.props.managerView}
              />
            : 
            (this.props.skill === 1 || this.props.skill === 2) ?
              <CaseStudyPreview 
                skill={this.props.skill}
                caseStudy={this.props.skill === 1 ? this.props.uxCaseStudy : this.props.researchCaseStudy}
                index={this.props.index}
                link={this.props.skill === 1 ? this.props.uxURL : this.props.researchURL}
                openModal={this.openModal.bind(this)}
                showSpecificQuestion={this.showSpecificQuestion.bind(this)}
                managerView={this.props.managerView}
              />
            :

            (this.props.skill === 4 && this.props.codingURL) ?
              <div>
                <p className="empty-sample-text">Code Samples</p>
                <a href={this.props.codingURL} target="_blank" rel="noopener noreferrer">{this.props.codingURL}</a>
              </div>
            :
            (this.props.skill === 4 && this.props.managerView) ?
              <EmptyStateManagerView 
                skill={this.props.skill} 
                index={this.props.index}
                showSpecificQuestion={this.showSpecificQuestion.bind(this)}
              />
            :
            (this.props.skill === 4) ?
              <EmptyState 
                skill={this.props.skill} 
                index={this.props.index}
                showSpecificQuestion={this.showSpecificQuestion.bind(this)}
              />
              :
            <div>
              <p className="empty-sample-text empty-sample-text-long">Something you did that improved your design team's output:</p>
              <p>{this.props.opsText ? this.props.opsText : "No answer"}</p>
            </div>
            }
          </div>
        </div>       
      </div>
    )
  }
}

export default Subskill
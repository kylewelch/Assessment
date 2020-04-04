import React, { Component } from 'react'
import Subskill from './Subskill.js'
import firebase from './Firebase.js'

const db = firebase.firestore();
let blankBlocks = ["visual-block", "ux-block", "research-block", "writing-block", "code-block", "ops-block"];
let filledBlocks = ["visual-block-filled", "ux-block-filled", "research-block-filled", "writing-block-filled", "code-block-filled", "ops-block-filled"];

// Single block component


function Block(props) {
  return <div className={"skill-grid-col-block " + props.value}></div>
}


// Single column component


class Column extends React.Component {
  currentSkill() {
    switch(this.props.skillType) {
      case 'Visual': return 0;
      case 'UX': return 1;
      case 'Research': return 2;
      case 'Writing': return 3;
      case 'Code': return 4;
      case 'Ops': return 5;
    }
  }
  renderBlock(i) {
    return (
      <Block 
        value={(i < this.props.skillLevel) ? filledBlocks[this.currentSkill()] : ('skill-blank ' + blankBlocks[this.currentSkill()])}
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
      <div className="skill-grid-col">
        <div className="skill-grid-col-label">
          <p className="skill-grid-col-label-text">{this.props.skillType}</p>
        </div>
        {col}
      </div>
    );
  }
}


// Skill grid component


class Grid extends Component {
  
  renderColumn(i) {
    return (
      <Column 
        skillType={this.props.skill_name[i]}
        skillLevel={this.props.skill_level[i]}
      />
    );
  }

  render() {
    let cols = [];
    for (let i = 0; i < this.props.selectedQuestions.length; ++i) {
      cols.push(this.renderColumn(i));
    }

    return (
      <div class="skill-grid">{cols}</div>
    );
  }
}


// Results Page


class ResultsDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      modalImage: null,
      images: [],
      imageCount: 0,

    }
  }
  componentDidMount() {
    let test = this.props.imageURLs;
    this.setState({test: test})
  }
  updateImageCount(i) {
    this.props.updateImageCount(i);
  }
  showSpecificQuestion(question) {
    this.props.showSpecificQuestion(question);
  }
  getSkillLevel() {
    this.props.PassSkillLevel()
  }
  openModal(skill, image) {
    this.setState({
      modal: skill,
      modalImage: image})
  }
  closeModal() {
    this.setState({modal: null});
  }
  
  render() {
    return(
      <div>
        {this.props.imageURLs && 
        <div className="results-container">
          <div className="header-container">
            <h1 className="main-heading no-margin">Denise Hansen</h1>
          </div>
          <div className="summary-container summary-container-results">
            <div className="summary-container-section">
              <div className="subskill-title-container">
                <p className="subskill-title">Summary</p>
              </div>
              <div className="results-info-section">
                  <div>
                    <p className="progress-bar-name">Name</p>
                    <p className="progress-bar-name">Portfolio</p>
                    <p className="progress-bar-name">Email</p>
                  </div>
                  <div className="results-info-area">
                  <p className="results-info">{this.props.contactInfo[0]}</p>
                    <p className="results-info">{this.props.contactInfo[1]}</p>
                    <p className="results-info">{this.props.contactInfo[2]}</p>
                  </div>
                </div>
            </div>
            <div className="summary-divider"></div>
            <div>
              <Grid 
                skill_level={this.props.skills} 
                skill_name={this.props.names}
                selectedQuestions={this.props.selectedQuestions}
                />
            </div>
          </div>

          {this.props.selectedQuestions.map((skill, index) => {
            return <Subskill 
                    skill={skill}
                    index={index}
                    skills={this.props.skills}
                    unsortedSkills={this.props.unsorted_values}
                    selectedQuestion={this.props.selectedQuestions[index]}
                    image={this.props.image[skill]}
                    imageTitle={this.props.imageTitles[skill]}
                    imageDescription={this.props.imageDescriptions[skill]}
                    uxURL={this.props.uxURL}
                    researchURL={this.props.researchURL}
                    codingURL={this.props.codingURL}
                    uxCaseStudy={this.props.uxCaseStudy}
                    researchCaseStudy={this.props.researchCaseStudy}
                    opsText={this.props.opsText}
                    modal={this.state.modal}
                    modalImage={this.state.modalImage}
                    openModal={this.openModal.bind(this)}
                    closeModal={this.closeModal.bind(this)}
                    showSpecificQuestion={this.showSpecificQuestion.bind(this)}
                    managerView={true}
                    />
          })}
        </div>
        }
      </div>
    )
  }
}

export default ResultsDashboard
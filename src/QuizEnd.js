import React, { Component } from 'react'
import Subskill from './Subskill.js'
import close from './img/close.svg'

let resultsData = require('./results_data.json')
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


// I-shaped results paragraph


class Ishape extends Component {

  render() {
    let iShape = resultsData.quiz_results[2]
    return (
      <span>
        <span>{iShape.results_text}</span>
        <b>{iShape.skill_shape}</b>
        <span>{iShape.results_text2}</span>
        <i>{this.props.deep_skills[0]}</i>
        {this.props.deep_skills[1] ? 
          <span>{iShape.results_text3}<i>{this.props.deep_skills[1]}</i></span>
           : null}
        <span>{iShape.results_text4}</span>
      </span>
    )
  }
}


// T-shaped description


class Tshape extends Component {

  render() {
    let tShape = resultsData.quiz_results[3]
    return (
      <span>
        <span>{tShape.results_text}</span>
        <b>{tShape.skill_shape}</b>
        <span>{tShape.results_text2}</span>
        <i>{this.props.deep_skills[0]}</i>
        {this.props.deep_skills[1] ? 
          <span>{tShape.results_text3}<i>{this.props.deep_skills[1]}</i>{tShape.results_text4}</span>
           : <span>{tShape.results_text3}</span> }
        <span>{tShape.results_text5}</span>
      </span>
    )
  }
}


// X-shaped description


class Xshape extends Component {

  render() {
    let xShape = resultsData.quiz_results[5]
    return (
      <span>
        <span>{xShape.results_text}</span>
        <b>{xShape.skill_shape}</b>
        <span>{xShape.results_text2}</span>
      </span>
    )
  }
}


// Tree-shaped description


class Treeshape extends Component {

  render() {
    let treeShape = resultsData.quiz_results[4]
    return (
      <span>
        <span>{treeShape.results_text}</span>
        <b>{treeShape.skill_shape}</b>
        <span>{treeShape.results_text2}</span>
        <span>{this.props.deep_skills.length}</span>        
        <span>{treeShape.results_text3}</span>
      </span>
    )
  }
}



// Results Page


class QuizEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      modalImage: null
    }
  }
  
  showSpecificQuestion(question) {
    this.props.showSpecificQuestion(question);
  }
  getSkillLevel() {
    this.props.PassSkillLevel()
  }
  renderDescription(shape) {
    switch (shape) {
            case "beginner": 
              return resultsData.quiz_results[0].results_text
              break;
            case "generalist":
              return resultsData.quiz_results[1].results_text
              break;
            case "unicorn":
              return resultsData.quiz_results[6].results_text;
              break;
            case "specialist":
              return <Ishape deep_skills={this.props.deep_skills} />
              break;
            case "T-shaped designer":
              return <Tshape deep_skills={this.props.deep_skills} />
              break;
            case "X-shaped designer":
              return <Xshape />
              break;
            default:
              return <Treeshape deep_skills={this.props.deep_skills} />
    }
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
      <div className="results-container">
        <div className="header-container">
          <div>
            <h1 className="main-heading no-margin">Almost Done...{/*(this.props.shape === "T-shaped designer" || this.props.shape === "specialist") ? ((this.props.deep_skills.length === 2) ? (this.props.deep_skills[0] + '/' + this.props.deep_skills[1] + ' ' + this.props.level) : (this.props.deep_skills[0] + ' ' + this.props.level)) : this.props.shape*/}</h1>
            <p className="results-subheading">Here are your results. Review and submit to show off your sweet sweet skills.</p>
          </div>
          <div className="nav-btn flex no-margin">Submit</div>
        </div>
        <div className="summary-container">
          <div className="subskill-container-section">
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
                  <p className="results-info">Denise Hansen</p>
                  <p className="results-info">DeniseHansen.com</p>
                  <p className="results-info">denisehansen@gmail.com</p>
                </div>
              </div>
          </div>
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
                   names={[this.props.selectedNames]}
                   subskills={this.props.subskills[this.props.selectedQuestions[index]]}
                   selectedQuestion={this.props.selectedQuestions[index]}
                   image={this.props.image[skill]}
                   imageTitle={this.props.imageTitle[skill]}
                   imageDescription={this.props.imageDescription[skill]}
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
                   />
        })}
        {/*<a href='#' onClick={this.handleResetClick.bind(this)}>Retake the Assessment</a>*/}
        <div className="nav-btn flex no-margin">Submit</div>
      </div>
    )
  }
}

export default QuizEnd
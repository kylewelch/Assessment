import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import checkmark from './img/checkmark.svg'
import computerDude from './img/computerDude.svg'
let resultsData = require('./results_data.json')



{/*
// Single block component


function Block(props) {
  return <div className={"skill-grid-col-block-preview " + props.value}></div>
}


// Single column component


class Column extends React.Component {
  renderBlock(i) {
    return (
      <Block 
        value={(i < this.props.skillLevel) ? 'skill-added' : 'skill-blank'}
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
        <div class="skill-grid-col-label">
          <p class="skill-grid-col-label-text">{this.props.skillType}</p>
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
      <div class="skill-grid-preview">{cols}</div>
    );
  }
}

*/}
// Results Page


class QuizPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copiedLink: false
    }
  }
  handleResetClick() {
    this.props.resetClickHandler()
  }
  getSkillLevel() {
    this.props.PassSkillLevel()
  }
  renderDescription(shape) {

  }
  showQuiz() {
    this.props.showQuiz();
  }

  copyLink = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copiedLink: true });
  };
  render() {
    let AssessmentID = this.props.assessmentID
    return(
      <div className="quiz-preview"> 
        <h1 className="main-heading-two">Your assessment is ready!{/*(this.props.shape === "T-shaped designer" || this.props.shape === "specialist") ? ((this.props.deep_skills.length === 2) ? (this.props.deep_skills[0] + '/' + this.props.deep_skills[1] + ' ' + this.props.level) : (this.props.deep_skills[0] + ' ' + this.props.level)) : this.props.shape*/}</h1>
        <img className="created-image" src={computerDude} />
        <div className="grid-preview">
          <p className="no-top-margin"><b>{this.props.assessmentName ? (this.props.assessmentName + " link:") : "Assessment link:"}</b></p>
          <Link to={"/Assessment/" + AssessmentID}>{"designertypes.com/Assessment/" + this.props.assessmentID}</Link>
        </div>
        <div className="nav-btn nav-btn-preview" onClick={this.copyLink.bind(this)}>
          <img className={this.state.copiedLink ? "button-icon" : "hide"} src={checkmark} />
          {this.state.copiedLink ? "Link copied to clipboard" : "Copy link"}
        </div>
        <form>
          <textarea 
            className="hide"
            value={"designertypes.com/Assessment/" + this.props.assessmentID}
            ref={(textarea) => this.textArea = textarea}
          >
          </textarea>
        </form>
      </div>
    )
  }
}

export default QuizPreview
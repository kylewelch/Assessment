import React, { Component } from 'react'
let resultsData = require('./results_data.json')


// Single block component


function Block(props) {
  return <div className={"skill-grid-col-block " + props.value}></div>
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
    for (let i = 0; i < 10; ++i) {
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
  
  handleResetClick() {
    this.props.resetClickHandler()
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
  render() {
    return(
      <div>
        <h1 className="main-heading">It looks like you're a {(this.props.shape === "T-shaped designer" || this.props.shape === "specialist") ? ((this.props.deep_skills.length === 2) ? (this.props.deep_skills[0] + '/' + this.props.deep_skills[1] + ' ' + this.props.level) : (this.props.deep_skills[0] + ' ' + this.props.level)) : this.props.shape}!</h1>
        <Grid skill_level={this.props.skills} skill_name={this.props.names}/>
        <p>{this.renderDescription(this.props.shape)}</p>
        {/*<a href='#' onClick={this.handleResetClick.bind(this)}>Retake the Assessment</a>*/}
      </div>
    )
  }
}

export default QuizEnd
import React, { Component } from 'react'
import Checkbox from './Checkbox.js'
import Subskill from './Subskill.js'
import firebase from './Firebase.js'
import AssessmentCreated from './AssessmentCreated.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

let introData = require('./intro_data.json')


// Required for side-effects
require("firebase/firestore");

var db = firebase.firestore();


class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentName: "",
      email: "",
      selectedSkills: [true, true, true, true, true, true]
    }
  }
  updateValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectItem(index) {
    
    // when user clicks a skill, toggle between selecting and deselecting that skill
    
    let selectedSkills = this.state.selectedSkills.slice();
    if (selectedSkills[index] === true) {
      selectedSkills[index] = false;
    } 
    else {
      selectedSkills[index] = true;
    }
    this.setState({selectedSkills: selectedSkills});
    
    // send the indexes of each selected skill up to the App state
    let skillIndexes = [];
    for (let i = 0; i < selectedSkills.length; i++) {
      if (selectedSkills[i] === true) {
        skillIndexes.push(i)
      }
    }
    this.props.updateSelectedSkills(skillIndexes);
  }
  
  /*createAssessment(e) {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection(“Assessments”).add({
      Name: this.state.assessmentName,
      Questions: this.state.selectedSkills
    }); 
  };*/
  
  createNewAssessment(e) {
    
    // Make sure they've selected at least 1 skill
    if (this.props.selectedQuestions.length === 0) {
        e.preventDefault();
    } 
    
    // Create and store their assessment in the Firestore DB
    else {
      let name = this.state.assessmentName;
      let email = this.state.email;
      let questions = this.props.selectedQuestions;
      let newAssessment = db.collection("assessments").doc();
      newAssessment.set({
        name: name,
        email: email,
        questions: questions,
        time: Date.now()
      })
      
      // Store the DB reference to this new assessment in the App state
      this.props.storeDBreference(newAssessment.id);
      
      // Move to the confirmation screen
      this.props.showPreview()
      this.props.showNextScreenHandler()
    }
  }
  render() { 
    const assessmentCreated = this.props.assessmentCreated;
    return (
      <main>
        {assessmentCreated ? 
          <AssessmentCreated 
            assessmentID={this.props.assessmentID}
            assessmentName={this.state.assessmentName} /> :
        <form>
          {/*<h1 className="main-heading">Create an assessment</h1>*/}
          <h1 className="title title-low-space">Create your custom skill assessment</h1>
          <p className="input-label center-label">SKILLS TO ASSESS</p>
          {/*<p>{this.props.selectedQuestions.length} of 6 skills selected</p>*/}
          <div className="skill-list">
            {this.props.fullNames.map((skill, index) => {
            return <Checkbox
                      key={index} 
                      index={index}
                      name={skill} 
                      isChecked={(this.state.selectedSkills[index])}
                      selectItem={this.selectItem.bind(this)} 
                    />
            })}
          </div>
          {(this.props.selectedQuestions.length === 0) ? <p className="validation-msg">Please select at least 1 skill you want to assess.</p> : null}
          
          <div className="input-fields">
            <div className="input-area">
              <p className="input-label">ASSESSMENT NAME</p>
              <input 
                className="text-input name-input" 
                type="text" 
                name="assessmentName" 
                placeholder="Name your assessment" 
                onChange={this.updateValue.bind(this)} 
                value={this.state.assessmentName}
                />
            </div>
            <div className="input-area right-area">
              <p className="input-label">YOUR EMAIL</p>
              <input 
                className="text-input email-input" 
                type="email" 
                name="email" 
                placeholder="Email address"  
                onChange={this.updateValue.bind(this)}
                value={this.state.email}
                />
            </div>
          </div>
          <button className="nav-btn btn-center" type="submit" onClick={this.createNewAssessment.bind(this)}>Create Assessment</button>
        </form>}
      </main>
    )
  }
}

export default Create
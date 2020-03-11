import React, { Component } from 'react'
import firebase from './Firebase.js'
import Quiz from './Quiz.js'
import Create from './Create.js'
import CardsAndSliders from './CardsAndSliders.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'

const AssessmentID = window.location.pathname.substr(12);
const db = firebase.firestore();

let introData = require('./intro_data.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      current_screen: 1,
      skillValues: Array(6).fill(null),
      skillNames: ['Visual', 'UX', 'Research', 'Writing', 'Code', 'Ops'], 
      skillFullNames: ['Visual Design', 'UX Design', 'UX Research', 'Writing', 'Code', 'DesignOps'],
      selectedQuestions: [0, 1, 2, 3, 4, 5],
      selectedNames: ['Visual', 'UX', 'Research', 'Writing', 'Code', 'Ops'],
      arrangedValues: [],
      arrangedNames: [],
      researchValues: [null, null, null, null, null, null, null, null, null, null, null, null],
      researchTotal: 0,
      researchScore: 0,
      motionValues: [null, null, null],
      leaderValues: [null, null, null, null, null],
      leaderValues2: [0, 0, 0, 0, 0],
      illustrationValues: [null, null],
      visualValues: [null, null, null, null, null],
      writingValues: [null, 0, 0],
      techValues: [null, null, null],
      opsValues: [null, null, 0],
      subskills: [[null, null, null, null, null], [null, null, null], [null, null, null, null, null], [null, null, null], [null, null], [null, null, null]],
      showPreview: false,
      image: [[null], [null], [null], [null]],
      imageTitle: [[null], [null], [null], [null]],
      imageDescription: [[null], [null], [null], [null]],
      assessmentID: null,
      assessmentQuestions: null,
      uxURL: null,
      researchURL: null,
      codingURL: null,
      uxCaseStudy: ["", "", "", "", ""],
      researchCaseStudy: ["", "", "", "", ""],
      opsOpenQuestion: ""
    }
  }
  
  // Store the skills selected during the creation of this assessment
  
  updateSelectedSkills(skills) {
    let selectedNames = []
    for (let i = 0; i < skills.length; i++) {
      selectedNames.push(this.state.skillNames[skills[i]])
    }
    this.setState({selectedQuestions: skills, selectedNames: selectedNames})
  }
  
  // After creating an assessment, store its DB reference in the App state
  storeDBreference(id) {
    this.setState({assessmentID: id})
  }
  
  // For questions that collect multiple data points, store those data in the App state
  
  updateSectionValue(updatedValue, section, question, position) {
    switch (question) {
      case 1:
        let visualValues = this.state.visualValues.slice()
        visualValues[section] = updatedValue
        this.setState({visualValues: visualValues})
        break;  
      case 3:
        let researchValues = this.state.researchValues.slice()
        let researchTotal = this.state.researchTotal;
        let status = (this.state.researchValues[section] === null) ? 1 : (this.state.researchValues[section] === 1) ? 2 : null;
        researchValues[section] = status;
        researchTotal += (status === null) ? -3 : status;
        let score = (researchTotal === null) ? 0 : (researchTotal < 6) ? 1 : (researchTotal < 12) ? 2 : (researchTotal < 18) ? 3 : (researchTotal < 24) ? 4 : 5;
        this.setState({researchValues: researchValues, researchTotal: researchTotal, researchScore: score});
        this.updateValue(score, position);
        break;      
      case 4:
        let writingValues = this.state.writingValues.slice();
        writingValues[section] = updatedValue;
        let writingTotal = Math.round(writingValues.reduce((a, b) => a + b, 0));
        this.setState({writingValues: writingValues});
        this.updateValue(writingTotal, position);
        break;
      default:
        let opsValues = this.state.opsValues.slice();
        opsValues[section] = updatedValue;
        let opsTotal = Math.round((opsValues.reduce((a, b) => a + b, 0)) / 2);
        this.setState({opsValues: opsValues});
        this.updateValue(opsTotal, position);  
    }
  }
  updateSliderValue(updatedValue, section) {
    let leaderSliderValues = this.state.leaderValues2.slice()
    leaderSliderValues[section] = updatedValue
    this.setState({leaderValues2: leaderSliderValues})
  }
  resetQuiz() {
    this.setState({quizFinished: false, deepSkills: []})      
  }
  
  updateSubskills(value, section, id) {
    let subskills = this.state.subskills.slice();
    switch(id) {
      case 2:
        subskills[1][section] = value;
        this.setState({subskills: subskills})
        break;
      case 3:
        subskills[2][section] = value;
        this.setState({subskills: subskills})
        break;
      case 4:
        subskills[3][section] = value;
        this.setState({subskills: subskills})
        break;
      case 5:
        subskills[4][section] = value;
        this.setState({subskills: subskills})
        break;
      case 6:
        subskills[5][section] = value;
        this.setState({subskills: subskills})
        break;
      default:
        subskills[0][section] = value;
        this.setState({subskills: subskills})
        break;
    }
  }
  
  // Once a question is completed (ie user hits the 'Next' button), store the answer value in the App state
  
  updateValue(updatedValue, thisIteration) {
    const skillValues = this.state.skillValues.slice()
    const skillNames = this.state.skillNames.slice()
    skillValues[thisIteration] = updatedValue
    this.setState({skillValues: skillValues}, () => {
             
    // At the end of the quiz, analyze the results
      
      if (this.state.skillValues[this.state.selectedQuestions.length - 1] != null)   {          
      let values = []
      let names = []
      for (let i = 0; i < this.state.selectedQuestions.length; i++) {
        if (this.state.skillValues[i] != null) {
          values.push(this.state.skillValues[i])
          names.push(this.state.skillNames[this.state.selectedQuestions[i]])
        }}
      this.setState({skillNames: names, skillValues: values})  
      }
    
    // Sort all answers into a bell curve
    
    let skillArray = []
    function Skill(name, level) {
      this.name = name;
      this.level = level;
    }
    for (let i = 0; i < this.state.selectedQuestions.length; i++) {
      let NewSkill = new Skill(this.state.selectedNames[i], this.state.skillValues[i])
      skillArray.push(NewSkill)
    }
    let Sorted = skillArray.sort((a, b) => (a.level > b.level) ? 1 : -1);
    let firstHalf = [];
    let secondHalf = [];
    function SortSkills() {
      for (let i = 0; i < Sorted.length; i += 2) {
      firstHalf.push(Sorted[i]);
      }
      for (let i = 1; i < Sorted.length; i += 2) {
      secondHalf.push(Sorted[i]);
      }
    }
    SortSkills();
    let Arranged = firstHalf.concat(secondHalf.sort((a, b) => (a.level < b.level) ? 1 : -1));
    let newLevels = Arranged.map(a => a.level);
    let newNames = Arranged.map(a => a.name);
    this.setState({arrangedValues: newLevels, arrangedNames: newNames})  

  })}
  showPreview() {
    this.setState({showPreview: true})
  }
  showQuiz() {
    this.setState({showPreview: false})
  }
  storeImage(image, number, question) {
    let uploads = this.state.image.slice();
    uploads[question][number] = image
    this.setState({image: uploads})
  }
  removeImage(number, question) {
    const uploads = this.state.image.slice();
    const titles = this.state.imageTitle.slice();
    const descriptions = this.state.imageDescription.slice();
    uploads[question][number] = null;
    titles[question][number] = null;
    descriptions[question][number] = null;
    this.setState({image: uploads, imageTitle: titles, imageDescription: descriptions})
  }
  deleteImage(number, question) {
    const uploads = this.state.image.slice();
    uploads[question].splice(number, 1)
    this.setState({image: uploads})
  }
  deleteUploadText(number, question) {
    const titles = this.state.imageTitle.slice();
    const descriptions = this.state.imageDescription.slice();
    titles[question].splice(number, 1)
    descriptions[question].splice(number, 1)
    this.setState({imageTitle: titles, imageDescription: descriptions})
  }
  updateTextInput(name, newValue, number, question) {
    let values;

    // if it's a UX case study
    if (number === "ux") {
      values = this.state.uxCaseStudy.slice();
      values[name] = newValue
      this.setState({uxCaseStudy: values})
    }
    // else if it's a research case study
    else if (number === "research") {
      values = this.state.researchCaseStudy.slice();
      values[name] = newValue
      this.setState({researchCaseStudy: values})
    }
    else if (number === "ops") {
      this.setState({opsOpenQuestion: newValue})
    }
    // else it's an image title / description
    else {
      values = (name === "imageTitle") ? this.state.imageTitle.slice() : this.state.imageDescription.slice();
      values[question][number] = newValue;
      this.setState({[name]: values});
    }
  }
  updateLinkValue(name, value) {
    this.setState({
      [name]: value
    })
  }
  showNextScreen() {
    this.setState((state) => {
      return {current_screen: state.current_screen + 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  
  render() {
    const didQuizStart = ((this.state.current_screen) === 2)
    return (
      <Router>
        <div className="container" ref={this.ref}>
          <Switch>
            <Route path="/Assessment">
              <Route path={"/Assessment/" + AssessmentID}>
                <Quiz 
                  selectedQuestions={this.state.selectedQuestions}
                  selectedNames={this.state.selectedNames}
                  updateQuizSectionValue={this.updateSectionValue.bind(this)}
                  updateQuizSliderValue={this.updateSliderValue.bind(this)}
                  updateQuizValue={this.updateValue.bind(this)}
                  updateSubskills={this.updateSubskills.bind(this)}
                  skill_values={this.state.arrangedValues} 
                  skill_names={this.state.arrangedNames}
                  unsorted_values={this.state.skillValues}
                  research_values={this.state.researchValues}
                  motion_values={this.state.motionValues}
                  leader_values={this.state.leaderValues}
                  leader_values2={this.state.leaderValues2}
                  illustration_values={this.state.illustrationValues}
                  visual_values={this.state.visualValues}
                  writing_values={this.state.writingValues}
                  tech_values={this.state.techValues}
                  ops_values={this.state.opsValues}
                  shape={this.state.skillShape}
                  resetQuiz={this.resetQuiz.bind(this)}
                  deep_skills={this.state.deepSkills}
                  level={this.state.level} 
                  subskills={this.state.subskills}
                  showPreview={this.state.showPreview}
                  showQuiz={this.showQuiz.bind(this)}
                  storeImage={this.storeImage.bind(this)}
                  removeImage={this.removeImage.bind(this)}
                  deleteImage={this.deleteImage.bind(this)}
                  deleteUploadText={this.deleteUploadText.bind(this)}
                  image={this.state.image}
                  imageTitle={this.state.imageTitle}
                  imageDescription={this.state.imageDescription}
                  updateTextInput={this.updateTextInput.bind(this)}
                  assessmentID={this.state.assessmentID}
                  updateLinkValue={this.updateLinkValue.bind(this)}
                  codingURL={this.state.codingURL}
                  uxCaseStudy={this.state.uxCaseStudy}
                  researchCaseStudy={this.state.researchCaseStudy}
                  opsText={this.state.opsOpenQuestion}
                />
              </Route>
            </Route>
            <Route path="/">
              <Create 
                intro_content={introData.intro_pages[this.state.current_screen - 1]} 
                showPreview={this.showPreview.bind(this)}
                showNextScreenHandler={this.showNextScreen.bind(this)}
                updateSelectedSkills={this.updateSelectedSkills.bind(this)}
                selectedQuestions={this.state.selectedQuestions}
                skills={this.state.arrangedValues}
                names={this.state.arrangedNames}
                subskills={this.state.subskills}
                fullNames={this.state.skillFullNames}
                storeDBreference={this.storeDBreference.bind(this)}
                assessmentCreated={this.state.showPreview}
                assessmentID={this.state.assessmentID}
              />
            </Route>
          </Switch>
          {/*didQuizStart ? <Quiz 
                         selectedQuestions={this.state.selectedQuestions}
                         selectedNames={this.state.selectedNames}
                         updateQuizSectionValue={this.updateSectionValue.bind(this)}
                         updateQuizSliderValue={this.updateSliderValue.bind(this)}
                         updateQuizValue={this.updateValue.bind(this)}
                         updateSubskills={this.updateSubskills.bind(this)}
                         skill_values={this.state.arrangedValues} 
                         skill_names={this.state.arrangedNames}
                         unsorted_values={this.state.skillValues}
                         research_values={this.state.researchValues}
                         motion_values={this.state.motionValues}
                         leader_values={this.state.leaderValues}
                         leader_values2={this.state.leaderValues2}
                         illustration_values={this.state.illustrationValues}
                          visual_values={this.state.visualValues}
                         writing_values={this.state.writingValues}
                         tech_values={this.state.techValues}
                         ops_values={this.state.opsValues}
                         shape={this.state.skillShape}
                         resetQuiz={this.resetQuiz.bind(this)}
                         deep_skills={this.state.deepSkills}
                         level={this.state.level} 
                         subskills={this.state.subskills}
                         showPreview={this.state.showPreview}
                         showQuiz={this.showQuiz.bind(this)}
                         storeImage={this.storeImage.bind(this)}
                         image={this.state.image}
                         assessmentID={this.state.assessmentID}
                        /> 
                      : <Create 
                          intro_content={introData.intro_pages[this.state.current_screen - 1]} 
                          showPreview={this.showPreview.bind(this)}
                          showNextScreenHandler={this.showNextScreen.bind(this)}
                          updateSelectedSkills={this.updateSelectedSkills.bind(this)}
                          selectedQuestions={this.state.selectedQuestions}
                          skills={this.state.arrangedValues}
                          names={this.state.arrangedNames}
                          subskills={this.state.subskills}
                          fullNames={this.state.skillFullNames}
                          storeDBreference={this.storeDBreference.bind(this)}
                          />*/}
        
          {/*<div className="image-upload-container">
            <div>
              <p className="text-label">Title</p>
              <input className="text-field" type="text"></input>
              <p className="text-label">Description</p>
              <textarea className="text-field"></textarea>
            </div>
            <div>
              <div className="subskill-empty-image">
                <div>Upload file</div>
              </div>
            </div>
          </div>*/}
        </div>
      </Router>
    )
  }
}

export default App
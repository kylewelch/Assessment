import React, { Component } from 'react'
import Quiz from './Quiz.js'
import Intro from './Intro.js'
import Create from './Create.js'
import Upload from './Upload.js'
import './App.css'

let introData = require('./intro_data.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_screen: 1,
      skillValues: Array(10).fill(null),
      skillNames: ['UI', 'UX', 'Research', 'Motion', 'Leadership', 'Illustration', 'Writing', 'Code', 'Future', 'Ops'], 
      skillFullNames: ['UI Design', 'UX Design', 'User Research', 'Motion Design', 'Design Leadership', 'Illustration', 'Writing', 'Front-end Engineering', 'Emerging Technology', 'Design Ops'],
      selectedQuestions: [],
      selectedNames: [],
      arrangedValues: [],
      arrangedNames: [],
      researchValues: [null, null, null, null, null],
      motionValues: [null, null, null],
      leaderValues: [null, null, null, null, null],
      leaderValues2: [0, 0, 0, 0, 0],
      illustrationValues: [null, null],
      writingValues: [null, null],
      techValues: [null, null, null],
      opsValues: [null, null, null]
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
  
  // For questions that collect multiple data points, store those data in the App state
  
  updateSectionValue(updatedValue, section, position) {
    switch (position) {
      case 3:
        let researchValues = this.state.researchValues.slice()
        researchValues[section] = updatedValue
        this.setState({researchValues: researchValues})
        break;
      case 4:
        let motionValues = this.state.motionValues.slice()
        motionValues[section] = updatedValue
        this.setState({motionValues: motionValues})
        break;
      case 5:
        let leaderValues = this.state.leaderValues.slice()
        leaderValues[section] = updatedValue
        this.setState({leaderValues: leaderValues})
        break;
      case 6:
        let illustrationValues = this.state.illustrationValues.slice()
        illustrationValues[section] = updatedValue
        this.setState({illustrationValues: illustrationValues})
        break;       
      case 7:
        let writingValues = this.state.writingValues.slice()
        writingValues[section] = updatedValue
        this.setState({writingValues: writingValues})
        break;
      case 9:
        let techValues = this.state.techValues.slice()
        techValues[section] = updatedValue
        this.setState({techValues: techValues})
        break;
      default:
        let opsValues = this.state.opsValues.slice()
        opsValues[section] = updatedValue
        this.setState({opsValues: opsValues})         
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

  showNextScreen() {
    this.setState((state) => {
      return {current_screen: state.current_screen + 1}
    })
  }
  
  render() {
    const didQuizStart = ((this.state.current_screen) === 2)
    
    return (
      <div class="container">
        {didQuizStart ? <Quiz 
                         selectedQuestions={this.state.selectedQuestions}
                         updateQuizSectionValue={this.updateSectionValue.bind(this)}
                         updateQuizSliderValue={this.updateSliderValue.bind(this)}
                         updateQuizValue={this.updateValue.bind(this)} 
                         skill_values={this.state.arrangedValues} 
                         skill_names={this.state.arrangedNames}
                         unsorted_values={this.state.skillValues}
                         research_values={this.state.researchValues}
                         motion_values={this.state.motionValues}
                         leader_values={this.state.leaderValues}
                         leader_values2={this.state.leaderValues2}
                         illustration_values={this.state.illustrationValues}
                         writing_values={this.state.writingValues}
                         tech_values={this.state.techValues}
                         ops_values={this.state.opsValues}
                         shape={this.state.skillShape}
                         resetQuiz={this.resetQuiz.bind(this)}
                         deep_skills={this.state.deepSkills}
                         level={this.state.level}
                        /> 
                      : <Create 
                          intro_content={introData.intro_pages[this.state.current_screen - 1]} 
                          showNextScreenHandler={this.showNextScreen.bind(this)}
                          updateSelectedSkills={this.updateSelectedSkills.bind(this)} />}
      </div>
    )
  }
}

export default App
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
    this.ref = React.createRef()
    this.state = {
      current_screen: 1,
      skillValues: Array(6).fill(null),
      skillNames: ['UI', 'UX', 'Research', 'Writing', 'Code', 'Ops'], 
      skillFullNames: ['Visual Design', 'UX Design', 'UX Research', 'Writing', 'Code', 'DesignOps'],
      selectedQuestions: [],
      selectedNames: [],
      arrangedValues: [],
      arrangedNames: [],
      researchValues: [null, null, null, null, null],
      motionValues: [null, null, null],
      leaderValues: [null, null, null, null, null],
      leaderValues2: [0, 0, 0, 0, 0],
      illustrationValues: [null, null],
      visualValues: [null, null, null, null, null],
      writingValues: [null, null],
      techValues: [null, null, null],
      opsValues: [null, null, null],
      subskills: [[null, null, null, null, null], [null, null, null], [null, null, null, null, null], [null, null, null], [null, null], [null, null, null]],
      showPreview: false
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
      case 1:
        let visualValues = this.state.visualValues.slice()
        visualValues[section] = updatedValue
        this.setState({visualValues: visualValues})
        break;  
      case 3:
        let researchValues = this.state.researchValues.slice()
        researchValues[section] = updatedValue
        this.setState({researchValues: researchValues})
        break;      
      case 4:
        let writingValues = this.state.writingValues.slice()
        writingValues[section] = updatedValue
        this.setState({writingValues: writingValues})
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
  showNextScreen() {
    this.setState((state) => {
      return {current_screen: state.current_screen + 1}
    })
    this.ref.current.scrollIntoView(/*{behavior: 'smooth'}*/)
  }
  
  render() {
    const didQuizStart = ((this.state.current_screen) === 2)
    
    return (
      <div class="container" ref={this.ref}>
        {didQuizStart ? <Quiz 
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
                          />}
      </div>
    )
  }
}

export default App
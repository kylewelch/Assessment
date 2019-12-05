import React, { Component } from 'react'
import Checkbox from './Checkbox.js'

let introData = require('./intro_data.json')

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentName: "",
      skills: ["UI Design", "UX Design", "UX Research", "Motion Design", "Management", "Illustration", "Writing", "Engineering", "Future Tech", "Design Ops"],
      selectedSkills: [false, false, false, false, false, false, false, false, false, false]
    }
  }
  updateName(e) {
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
  
  createAssessment(e) {
    e.preventDefault();
    /*const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection(“Assessments”).add({
      Name: this.state.assessmentName,
      Questions: this.state.selectedSkills
    });*/ 
  };
  
  showNextScreen() {
    this.props.showNextScreenHandler()
  }

  render() { 
    return (
      <main>
        <form onSubmit={this.createAssessment.bind(this)}>
          <input 
            className="assessment-name-input" 
            type="text" 
            name="assessmentName" 
            placeholder="Name this assessment" 
            onChange={this.updateName.bind(this)} 
            value={this.state.assessmentName}
            />
          <h1 className="main-heading">Which skills would you like to assess?</h1>
          <div className="skill-list">
            {this.state.skills.map((skill, index) => {
            return <Checkbox
                      key={index} 
                      index={index}
                      name={skill} 
                      isChecked={(this.state.selectedSkills[index])}
                      selectItem={this.selectItem.bind(this)} 
                    />
            })}
          </div>
          <button className="nav-btn" type="submit" onClick={this.showNextScreen.bind(this)}>Next</button>
        </form>
      </main>
    )
  }
}

export default Create
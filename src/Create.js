import React, { Component } from 'react'
import Checkbox from './Checkbox.js'

let introData = require('./intro_data.json')

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentName: "",
      skills: ["UI Design", "UX Design", "UX Research", "Motion Design", "Management", "Illustration", "Writing", "Engineering", "Design Ops", "Future Tech"],
      selectedSkills: [false, false, false, false, false, false, false, false, false, false]
    }
  }
  updateName(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  selectItem(index) {
    let selectedSkills = this.state.selectedSkills.slice();
    if (selectedSkills[index] === true) {
      selectedSkills[index] = false;
    } 
    else {
      selectedSkills[index] = true;
    }
    this.setState({selectedSkills: selectedSkills});
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
          <button className="nav-btn" type="submit">Next</button>
        </form>
      </main>
    )
  }
}

export default Create
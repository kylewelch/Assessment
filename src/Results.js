import React, { Component } from 'react'
import Subskill from './Subskill.js'
import firebase from './Firebase.js'
import ResultsDashboard from './ResultsDashboard.js';

const db = firebase.firestore();

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentID: "",
      selectedQuestions: [],
      unsortedValues: [],
      skills: [],
      names: [],
      visualImageTitles: [],
      uxImageTitles: [],
      researchImageTitles: [],
      writingImageTitles: [],
      visualImageDescriptions: [],
      uxImageDescriptions: [],
      researchImageDescriptions: [],
      writingImageDescriptions: [],
      uxURL: "",
      researchURL: "",
      codingURL: "",
      uxCaseStudy: [],
      researchCaseStudy: [],
      opsText: "",
      image: [[null], [null], [null], [null]],
      imageTitle: [[null], [null], [null], [null]],
      imageDescription: [[null], [null], [null], [null]]

    }
  }

  componentDidMount() {
    let thisSubmission = db.collection("submissions").doc(window.location.pathname.substr(9));
    thisSubmission.get().then((doc) => {
      this.setState({
        selectedQuestions: doc.data().selectedQuestions,
        assessmentID: doc.data().assessmentID,
        selectedQuestions: doc.data().selectedQuestions,
        unsortedValues: doc.data().unsortedValues,
        skills: doc.data().skills,
        names: doc.data().names,
        visualImageTitles: doc.data().visualImageTitles,
        uxImageTitles: doc.data().uxImageTitles,
        researchImageTitles: doc.data().researchImageTitles,
        writingImageTitles: doc.data().writingImageTitles,
        visualImageDescriptions: doc.data().visualImageDescriptions,
        uxImageDescriptions: doc.data().uxImageDescriptions,
        researchImageDescriptions: doc.data().researchImageDescriptions,
        writingImageDescriptions: doc.data().writingImageDescriptions,
        uxURL: doc.data().uxURL,
        researchURL: doc.data().researchURL,
        codingURL: doc.data().codingURL,
        uxCaseStudy: doc.data().uxCaseStudy,
        researchCaseStudy: doc.data().researchCaseStudy,
        opsText: doc.data().opsText,
      });
    });
  }

  render() {
    return(
      <ResultsDashboard 
        assessmentID={this.state.assessmentID}
        selectedQuestions={this.state.selectedQuestions} 
        unsorted_values={this.state.unsortedValues}
        skills={this.state.skills} 
        names={this.state.names}
        visualImageTitles={this.state.visualImageTitles}
        uxImageTitles={this.state.uxImageTitles}
        researchImageTitles={this.state.researchImageTitles}
        writingImageTitles={this.state.writingImageTitles}
        visualImageDescriptions={this.state.visualImageDescriptions}
        uxImageDescriptions={this.state.uxImageDescriptions}
        researchImageDescriptions={this.state.researchImageDescriptions}
        writingImageDescriptions={this.state.writingImageDescriptions}
        uxURL={this.state.uxURL}
        researchURL={this.state.researchURL}
        codingURL={this.state.codingURL}
        uxCaseStudy={this.state.uxCaseStudy}
        researchCaseStudy={this.state.researchCaseStudy}
        opsText={this.state.opsText}
        image={this.state.image}
        imageTitle={this.state.image}
        imageDescription={this.state.image}
      />
    )
  }
}

export default Results
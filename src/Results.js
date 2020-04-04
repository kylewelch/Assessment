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
      imageTitles: [[null], [null], [null], [null]],
      imageDescriptions: [[null], [null], [null], [null]],
      imageURLs: [],
      contactInfo: [[null], [null], [null]],
      loaded: false

    }
  }

  componentWillMount() {
    // Load data from Firebase
    let thisSubmission = db.collection("submissions").doc(window.location.pathname.substr(9));
    thisSubmission.get().then((doc) => {
      this.setState({
        selectedQuestions: doc.data().selectedQuestions,
        assessmentID: doc.data().assessmentID,
        selectedQuestions: doc.data().selectedQuestions,
        unsortedValues: doc.data().unsortedValues,
        skills: doc.data().skills,
        names: doc.data().names,
        imageNames: [doc.data().visualImageNames, doc.data().uxImageNames, doc.data().researchImageNames, doc.data().writingImageNames],
        imageTitles: [doc.data().visualImageTitles, doc.data().uxImageTitles, doc.data().researchImageTitles, doc.data().writingImageTitles],
        imageDescriptions: [doc.data().visualImageDescriptions, doc.data().uxImageDescriptions, doc.data().researchImageDescriptions, doc.data().writingImageDescriptions],
        uxURL: doc.data().uxURL,
        researchURL: doc.data().researchURL,
        codingURL: doc.data().codingURL,
        uxCaseStudy: doc.data().uxCaseStudy,
        researchCaseStudy: doc.data().researchCaseStudy,
        opsText: doc.data().opsText,
        contactInfo: doc.data().contactInfo, 
      });
    }).then(() => {

      // load images from Storage
      let storagePath = window.location.pathname.substr(9);
      let storageRef = firebase.storage().ref();
      var listRef = storageRef.child(storagePath);

      // Get all of the images from storage
      listRef.listAll().then((result) => {
        result.items.forEach((imageRef) => {
          let name = imageRef.name;
          imageRef.getDownloadURL().then((url) => {
            let i, j;
            let names = this.state.imageNames;
            for (i = 0; i < names.length; i++){
              for (j = 0; j < names[i].length; j++) {
                if (name === names[i][j]) {
                  let images = this.state.image.slice();
                  images[i][j] = url;
                  this.setState({image: images})
                }
              }
            }
            let URLs = this.state.imageURLs.slice();
            URLs.push({"url": url, "name": name});
            this.setState({imageURLs: URLs, testing: imageRef})
          })   
        })
      })
      setTimeout(() => { 

        this.setState({loaded: true});
      }, 2000);
    })
  }
  render() {
    return(
      <div>
        {this.state.loaded &&
        <ResultsDashboard 
          assessmentID={this.state.assessmentID}
          selectedQuestions={this.state.selectedQuestions} 
          unsorted_values={this.state.unsortedValues}
          skills={this.state.skills} 
          names={this.state.names}
          image={this.state.image}
          imageURLs={this.state.imageURLs}
          imageNames={this.state.imageNames}
          imageTitles={this.state.imageTitles}
          imageDescriptions={this.state.imageDescriptions}
          uxURL={this.state.uxURL}
          researchURL={this.state.researchURL}
          codingURL={this.state.codingURL}
          uxCaseStudy={this.state.uxCaseStudy}
          researchCaseStudy={this.state.researchCaseStudy}
          opsText={this.state.opsText}
          contactInfo={this.state.contactInfo}

        />
       }
      </div>
    )
  }
}

export default Results
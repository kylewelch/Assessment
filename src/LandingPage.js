import React, { Component } from 'react'
import illustration from './img/landingIllustration.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() { 
   
    return (
      <main className="landing-page">
       <h1 className="landing-page-header">Thorough and concise<br />talent assessment</h1>
       <p className="landing-page-description">That’s right. Finally, there’s a tool for design leaders to easily and honestly assess design talent.</p>
       <Link className="link" to={"/Create"}><button className="nav-btn btn-center start-btn" type="submit">Create an Assessment</button></Link>
       <img className="landing-page-illustration" src={illustration} />
      </main>
    )
  }
}

export default LandingPage
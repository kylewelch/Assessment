import React, { Component } from 'react'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'
import NavButton from './NavButton.js'
import image from './img/placeholder.png'

let introData = require('./intro_data.json')

class Intro extends Component {
  handleClick(buttonText) {
      this.props.showNextScreenHandler()
  }
  render() { 
    const hasImage = this.props.intro_content.image
    
    return (
        <main>
          <h1 className="main-heading">{this.props.intro_content.main_text}</h1>
            <p className="sub-heading">{this.props.intro_content.sub_text}</p>
        {hasImage ? <img className="main-img" src={image} alt="placeholder skill grid"/> : null }
          <section className="buttons">   
              <NavButton className=" " button_text={this.props.intro_content} clickHandler={this.handleClick.bind(this)} />
          </section>
        </main>
    )
  }
}

export default Intro
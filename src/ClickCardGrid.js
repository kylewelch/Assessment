import React, { Component } from 'react'
import ClickCard from './ClickCard.js'
import CaseStudy from './CaseStudy.js'
import Upload from './Upload.js'
import NavButton from './NavButton.js'

class ClickCardGrid extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        click: 0
      }
  }
  updateStatus(value, method, question, position) {
    let click = this.state.click
    click++
    this.setState({click: click})
    this.props.updateSectionValue(value, method, question, position)
  }
  storeImage(image) {
    this.props.storeImage(image);
  }
  showUploadPage() {
    this.props.showUploadPage()
  }
  editUpload(index) {
    this.props.editUpload(index)
  }
  updateLinkValue(name, value) {
    this.props.updateLinkValue(name, value)
  }
  updateTextInput(name, value, number, question) {
    this.props.updateTextInput(name, value, number, question)
  }
  showNextQuestion() {
    this.props.showNextQuestionHandler();
  }
  showPreviousQuestion() {
    this.props.showPreviousQuestionHandler();
  }
  render() {
    const methods = ['User Interviews', 'Surveys', 'Prototype Testing', 'Usability Studies', 'A/B Testing & Analytics', 'Card Sorting', 'Field Studies', 'Persona Building', 'Task Analysis', 'Journey Mapping', 'Accessibility Evaluation', 'Competitive Analysis']
    return (
      <section>
        <div className="click-card-grid">
          {methods.map((method, index) => {
            return <ClickCard 
                      methods={method}
                      key={method}
                      index={index}
                      updateStatus={this.updateStatus.bind(this)}
                      status={this.props.section_values[index]}
                      click={this.state.click} 
                      quiz_question={this.props.quiz_question}
                      quiz_position={this.props.quiz_position}
                    />
          })}
        </div>
        
        {this.props.currentSkillValue ? 
          <div className="follow-up-section">
            {/*this.props.quiz_question.skip_subskills ? null :
              <div>
                <h2>How much experience do you have with the following:</h2>
                {this.props.quiz_question.subskills.map((level, index) => {
                  return <QuizQuestionHorizontalRadio 
                            key={index} 
                            index={index}
                            answer_text={level} 
                            isChecked={(this.props.currentSkillValue === index)}
                            updateSubskills={this.updateSubskills.bind(this)} 
                            question_data={this.props.quiz_question}
                            subskillValue={this.props.subskills[index]}
                          />
                })}
              </div>21
              */}
            {(this.props.quiz_question.id === 3) ? 
            <CaseStudy 
              quiz_question={this.props.quiz_question}
              updateTextInput={this.updateTextInput.bind(this)}
              updateLinkValue={this.updateLinkValue.bind(this)}
              caseStudy={this.props.caseStudy}
              url={this.props.url}
            /> : null}
            
            <Upload 
              quiz_question={this.props.quiz_question}
              skills={this.props.quiz_question.subskills}
              storeImage={this.storeImage.bind(this)}
              image={this.props.image} 
              imageTitle={this.props.imageTitle}
              imageDescription={this.props.imageDescription}
              showUploadPage={this.showUploadPage.bind(this)} 
              editUpload={this.editUpload.bind(this)}           
            />
          </div> : null
        }
        <div className="nav-section">
          <NavButton 
            button_text={this.props.nav_text} 
            className=" nav-btn-secondary"
            clickHandler={this.showPreviousQuestion.bind(this)} />
          <NavButton 
            button_text={this.props.quiz_question} 
            className=" "
            clickHandler={this.showNextQuestion.bind(this)} />
        </div>
      </section>
    )
  }
}

export default ClickCardGrid
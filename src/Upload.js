import React, { Component } from 'react'
import UploadPreview from './UploadPreview.js'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: null
    }
  }
  getInitialState() {
    return{file: []}
  }

  showUploadPage() {
    this.props.showUploadPage();
  }
  
  editUpload(index) {
    this.props.editUpload(index);
  }

  onChange() {  
    // Assuming only image
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        this.setState({
          imgSrc: [reader.result]
        })
        this.props.storeImage(reader.result);
      }.bind(this);

    // TODO: concat files
  }

  render() {
    return (
      <div>
        {// If this is the coding question, only ask for a URL
        (this.props.quiz_question.id === 5) ? 
        
          <div>
            <h2>{this.props.quiz_question.followup}</h2>
            <p className="text-label">Provide a link to any code samples that you’d like to share (GitHub, CodePen, etc.)</p>
            <input
              type="url/"
              name="caseStudyLink"
              className="text-field"
            />
          </div> : 
        
        <div>
          {(this.props.quiz_question.id === 1) ? 
            <div>
              <h2>{this.props.quiz_question.followup
                /*<h3>Share a sample of your {this.props.skills[0]}{this.props.skills[2] ? ', ' : ' or '} {this.props.skills[1]} {this.props.skills[2] ? ', or ' : null} {this.props.skills[2] ? this.props.skills[2] : null}</h3>*/}</h2>
              <p>Optional, but it’s strongly recommended to share at least one sample</p>
            </div>
            : null}
          {// Show a preview of each upload for this skill
          }
          <div className="sample-preview">
            {this.props.image[0] ? 
              <div class="upload-grid">
                {this.props.image.map((image, index) => {
                  return <UploadPreview
                          index={index} 
                          image={image}
                          imageTitle={this.props.imageTitle[index]}
                          imageDescription={this.props.imageDescription[index]}
                          editUpload={this.editUpload.bind(this)}
                            />
                })}
                <div className="upload-box" onClick={this.showUploadPage.bind(this)}>+ Add Sample</div>
              </div>
              // Show this if nothing has been uploaded yet
                : 
                <div className="image-box">
                  <div className="upload-box">
                    No samples uploaded yet
                  </div>
                  <div className="upload-label" onClick={this.showUploadPage.bind(this)}>Add Sample</div>
                </div>
              }
          </div>
        </div>
        }
      </div>
   )
  }
}

export default Upload
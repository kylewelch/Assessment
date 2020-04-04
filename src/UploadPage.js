import React, { Component } from 'react'
import NavButton from './NavButton.js'
import upload from './img/upload.svg'
import close from './img/close.svg'
import remove from './img/delete.svg'
import firebase from './Firebase.js'

class UploadPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: null,
      uploaded: false
    }
  }
  getInitialState() {
    return{file: []}
  }
  closeUploadPage() {
    this.props.closeUploadPage();
    if (!this.props.submittedImage && this.props.editUpload === null) {
      const uploadNumber = (this.props.image.length - 1)
      this.props.removeImage(uploadNumber, (this.props.quizPosition - 1));
      this.props.deleteUploadText(uploadNumber, (this.props.quizPosition - 1));
    }
  }
  submitSample() {
    this.props.closeUploadPage()
    this.props.submitImage()
  }
  updateValue(e) {
    const uploadNumber = (this.props.image.length - 1)
    this.props.updateTextInput(e.target.name, e.target.value, uploadNumber, (this.props.quizQuestion.id - 1))
  }
  onChange() {  
    // Assuming only image
    var file = this.refs.file.files[0];
    var name = file.name; 
    // var storageRef = firebase.storage().ref('testFolder/' + file.name);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        const uploadNumber = (this.props.image[0] === null) ? 0 : (this.props.image.length)
        this.setState({
          imgSrc: [reader.result]
        })
        if (this.state.imgSrc) {
          this.props.storeImage(reader.result, uploadNumber, name, file);
        }
      }.bind(this);

      /*upload file to storage
      var task = storageRef.put(file);
      task.on('state_changed', 
        function check() {
          console.log('success')
        }

      )*/
    this.setState({uploaded: true})


    // TODO: concat files
  }

  // doesn't store the image if they cancel their upload submission
  removeImage() {
    if (this.state.uploaded) {
      this.setState({uploaded: false})
      const uploadNumber = (this.props.editUpload !== null) ? this.props.editUpload : (this.props.image.length - 1)
      this.props.removeImage(uploadNumber, (this.props.quizQuestion.id - 1))
    }
  }

  // deletes an image when they click the delete button
  deleteImage() {
    this.setState({uploaded: false})
    const uploadNumber = (this.props.editUpload !== null) ? this.props.editUpload : (this.props.image.length - 1)
    this.props.deleteImage(uploadNumber, (this.props.quizQuestion.id - 1))
    this.props.deleteUploadText(uploadNumber, (this.props.quizQuestion.id - 1));
  }

  render() {
    const uploadNumber = (this.props.image[0] === null) ? 0 : (this.props.image.length)
    return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>{this.props.quizQuestion.skill_name} Sample</h1>
        <img 
          className="close-button" 
          src={close} 
          onClick={this.closeUploadPage.bind(this)} />
      </div>
      <section className="upload-section">
        { // If editing an existing image
          (this.props.editUpload !== null) ? 
          <div className="image-box">
            <img className="delete-image" src={remove} onClick={this.deleteImage.bind(this)} />
            <img className="uploaded-image" src={this.props.image[this.props.editUpload]} />
          </div> : 
          // Otherwise, uploading a new image
          (this.state.uploaded ? 
            <div className="image-box">
            <img className="delete-image" src={remove} onClick={this.deleteImage.bind(this)} />
            <img className="uploaded-image" src={this.props.image[uploadNumber - 1]} />
          </div> : 
          <div className="upload-box">
            <img src={upload} className="upload-icon" />
            <form>
            <input
              ref="file" 
              type="file" 
              name="user[image]" 
              className="upload-button"
              multiple={false}
              id="file"
              value={this.props.codingURL}
              onChange={this.onChange.bind(this)}/>
              <label className="upload-button-label" for="file">Choose a file</label>
            </form>
          </div>)
        }
        <div className="upload-fields">
          <p className="text-label">Title</p>
          <input
            type="text"
            name="imageTitle"
            className="text-field"
            onChange={this.updateValue.bind(this)}
            value={(this.props.editUpload !== null) ? this.props.imageTitle[this.props.editUpload] : this.props.imageTitle[uploadNumber]} />
          <p className="text-label">Description</p>
          <textarea
            name="imageDescription"
            className="text-field text-area"
            rows="4"
            onChange={this.updateValue.bind(this)}
            value={(this.props.editUpload !== null) ? this.props.imageDescription[this.props.editUpload] : this.props.imageDescription[uploadNumber]} />
        </div>
      </section>
      <div className="nav-section-spread">
        <NavButton 
          button_text={{cta_text: "Cancel"}} 
          className=" nav-btn-secondary"
          clickHandler={this.closeUploadPage.bind(this)}
        />
        <NavButton 
          button_text={{cta_text: "Upload Sample"}} 
          className=" "
          clickHandler={this.submitSample.bind(this)}
        />
      </div>
    </div>
   )
  }
}

export default UploadPage
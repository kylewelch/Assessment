import React, { Component } from 'react'
import editSample from './img/edit.svg'

class UploadPreview extends Component {
  editUpload() {
    this.props.editUpload(this.props.index);
  }
  render() { 
    return (
      <div className="image-box">
        <img className="delete-image" src={editSample} onClick={this.editUpload.bind(this)} />
        <img className="uploaded-image" src={this.props.image} />
        <h2 className="upload-title">{this.props.imageTitle}</h2>
        <p className="upload-description">{this.props.imageDescription}</p>
      </div>
    )
  }
}

export default UploadPreview
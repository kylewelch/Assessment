import React, { Component } from 'react'
import UploadPreview from './UploadPreview.js'
import upload from './img/upload.svg'
import add from './img/add.svg'
import view from './img/view.svg'
import testImg from './img/testImage.jpg'

class Carousel extends Component {
  openModal() {
    this.props.openModal(this.props.index);
  }
  
  render() {
    return (
      <div className="carousel-container">
        {this.props.image ? "yes" : "no"}
        <div className="carousel-image-box" onClick={this.openModal.bind(this)}>
          <div className="image-overlay">
            <img className="view-image" src={view} />
          </div>
          <img className="image-preview" src={testImg} />
        </div>

        <div className="carousel-image-box">
          <div className="image-overlay">
            <img className="view-image" src={view} />
          </div>
          <img className="image-preview" src={testImg} />
        </div>

        <div className="carousel-image-box">
          <div className="image-overlay">
            <img className="view-image" src={view} />
          </div>
          <img className="image-preview" src={testImg} />
        </div>

        <div className="carousel-image-box">
          <div className="image-overlay">
            <img className="view-image" src={view} />
          </div>
          <img className="image-preview" src={testImg} />
        </div>
      </div>
   )
  }
}

export default Carousel
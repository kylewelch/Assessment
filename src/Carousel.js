import React, { Component } from 'react'
import EmptyState from './EmptyState.js'
import CarouselImage from './CarouselImage.js'
import UploadPreview from './UploadPreview.js'
import upload from './img/upload.svg'
import add from './img/add.svg'
import view from './img/view.svg'
import testImg from './img/testImage.jpg'

class Carousel extends Component {
  openModal(skill, image) {
    this.props.openModal(skill, image);
  }
  showSpecificQuestion(question) {
    this.props.showSpecificQuestion(question);
  }
  
  render() {
    return (
      <div>
        {this.props.image[0] ?

          <div className="carousel-container">
            {this.props.image.map((image, index) => {
            return (
              <CarouselImage
                openModal={this.openModal.bind(this)}
                image={image}
                imageNumber={index}
                index={this.props.index}
              />
            )})}
          </div> 
          : 
          <EmptyState 
            skill={this.props.skill} 
            index={this.props.index}
            showSpecificQuestion={this.showSpecificQuestion.bind(this)}
          />
          }
      </div>
   )
  }
}

export default Carousel
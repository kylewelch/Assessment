import React, { Component } from 'react'
import EmptyState from './EmptyState.js'
import EmptyStateManagerView from './EmptyStateManagerView.js'
import CarouselImage from './CarouselImage.js'

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
          this.props.managerView ?

          <EmptyStateManagerView
            skill={this.props.skill} 
            index={this.props.index}
            showSpecificQuestion={this.showSpecificQuestion.bind(this)}
          />
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
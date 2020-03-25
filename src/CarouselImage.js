import React, { Component } from 'react'
import view from './img/view.svg'

class CarouselImage extends Component {
  openModal() {
    this.props.openModal(this.props.index, this.props.imageNumber);
  }
  
  render() {
    return (
      <div className="carousel-image-box" onClick={this.openModal.bind(this)}>
        <div className="image-overlay">
          <img className="view-image" src={view} />
        </div>
        <img className="image-preview" src={this.props.image} />
      </div>
    )
  }
}

export default CarouselImage
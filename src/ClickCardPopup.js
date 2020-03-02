import React, { Component } from 'react'

class ClickCard extends Component {
  handleClick() {
    this.props.updateStatus(this.props.index) 
  }
  render() {
    return (
      <div className="click-card" onClick={this.handleClick.bind(this)}>
        <div className="click-card-image"></div>
        <div className="click-card-title">{this.props.methods}</div>
        <div className={(this.props.status === 2) ? "click-card-experience click-card-experience-high" : "click-card-experience"}>{(this.props.status === 2) ? 'very experienced' : (this.props.status === 1) ? 'experienced' : null}</div>
      </div>
    )
  }
}

export default ClickCard
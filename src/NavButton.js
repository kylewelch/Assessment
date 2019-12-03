import React, { Component } from 'react'

class NavButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.button_text)
  }
  render() {
    return (
        <button className={"nav-btn" + this.props.className} onClick={this.handleClick.bind(this)}>
          {this.props.button_text.cta_text}
        </button>
    )
  }
}

export default NavButton
import React, { Component } from 'react'
import emoji1 from './img/emoji1.svg'
import emoji2 from './img/emoji2.svg'
import emoji3 from './img/emoji3.svg'
import emoji4 from './img/emoji4.svg'
import emoji5 from './img/emoji5.svg'
import emoji1a from './img/emoji1_fill.svg'
import emoji2a from './img/emoji2_fill.svg'
import emoji3a from './img/emoji3_fill.svg'
import emoji4a from './img/emoji4_fill.svg'
import emoji5a from './img/emoji5_fill.svg'

let images = [emoji1, emoji2, emoji3, emoji4, emoji5]
let filled_images = [emoji1a, emoji2a, emoji3a, emoji4a, emoji5a]

class EmojiButton extends Component {
  handleClick() {
    this.props.clickHandler(this.props.question_data.answer_options[this.props.answer_option], this.props.section, this.props.quiz_position)
  }
  render() {
    return (
      <div className="emoji-container">
        <img src={this.props.isChecked ? filled_images[this.props.answer_option] : images[this.props.answer_option]} alt="emoji" onClick={this.handleClick.bind(this)} />
        <p className="emoji-text">{this.props.question_data.emoji_text[this.props.answer_option]}</p>
      </div>
    )
  }
}

export default EmojiButton
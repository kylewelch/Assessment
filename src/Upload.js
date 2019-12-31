import React, { Component } from 'react'


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

  onChange() {  
    // Assuming only image
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result]
        })
      }.bind(this);

    // TODO: concat files
  }

  render() {
    return (
    <div className="upload-section">
      <h3>Share a sample of your {this.props.skills[0]}{this.props.skills[2] ? ', ' : ' or '} {this.props.skills[1]} {this.props.skills[2] ? ', or ' : null} {this.props.skills[2] ? this.props.skills[2] : null}</h3>
      <p>Optional, but it’s strongly recommended to share at least one sample</p>
      <form>
        <input
          ref="file" 
          type="file" 
          name="user[image]" 
          multiple="false"
          onChange={this.onChange.bind(this)}/>
       </form>
      {/* Only show first image, for now. */}
      <img className="uploads" src={this.state.imgSrc} />
    </div>
   )
  }
}

export default Upload
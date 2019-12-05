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
    <div>
      <form>
        <input 
          ref="file" 
          type="file" 
          name="user[image]" 
          multiple="true"
          onChange={this.onChange.bind(this)}/>
       </form>
      {/* Only show first image, for now. */}
      <img src={this.state.imgSrc} />
    </div>
   )
  }
}

export default Upload
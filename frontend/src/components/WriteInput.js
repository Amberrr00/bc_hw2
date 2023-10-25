import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export default class WriteInput extends React.Component {

  state = {
    name:this.props.name,
    label:this.props.label
  }

  handleKeyUp = (event) =>{
    const{keyCode, target} = event
    console.log(keyCode)
    if(keyCode !== 13) return
    console.log(target.value)
    this.setState({label:target.value})
  }

  render(){
    const {name, label} = this.state
    return (
        <div>
          {name}
          <MDBInput onKeyUp={this.handleKeyUp} label={label} id='form1' type='text' />
        </div>
      );
  }
}
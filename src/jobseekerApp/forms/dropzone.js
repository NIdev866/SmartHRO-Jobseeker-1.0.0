import React, { PropTypes } from "react"
import Dropzone from 'react-dropzone'
import { reduxForm } from 'redux-form'
import validate from './validate'

class Basic extends React.Component {
  constructor(props) {
    super(props)
    const { input: { value, onChange } } = this.props
    if(value){
      this.state = { files: value }
    }else {
      this.state = { files: [] }
    }
    this.onDrop = this.onDrop.bind(this)
  }
  onDrop(files) {
    const { value, onChange } = this.props.input
    this.setState({
        files
      }, ()=>{
        onChange(this.state.files)
    })
  }
  render() {
    const boxStyling = {
      display: "block",
      margin: "auto",
      width: "200px",
      marginTop: '20px',
    }
    const ulStyling = {
      overflowWrap: "break-word",
      listStyle: "none",
      width: "150px",
      margin: "0",
      marginLeft: "-15px",
      marginTop: "45px"
    }
    return (
      <section>
        <div className="dropzone" style={boxStyling}>
          <Dropzone 
            onDrop={this.onDrop.bind(this)}
            accept=".doc,.rtf,.wps,.odt,.wpd,.txt,.pdf,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <p>{this.context.t('Tap to upload CV')}</p>
            <ul style={ulStyling}>
              {
                this.state.files.map(f => <li key={f.name}>{f.name}</li>)
              }
            </ul>
          </Dropzone>
        </div>
      </section>
    )
  }
}

Basic.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Basic)

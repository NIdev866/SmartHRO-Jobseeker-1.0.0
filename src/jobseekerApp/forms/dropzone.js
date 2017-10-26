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

    console.log({onDrop: files})

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






//Some other version if the first one doesnt work

/*import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';

class FileInput extends Component {
  static propTypes = {
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    input: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    cbFunction: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };

  render() {
    const { className, input: { onChange }, dropzone_options, meta: { error, touched }, label, classNameLabel, children, name, cbFunction } = this.props;

    const boxStyling = {
      display: "block",
      margin: "auto",
      width: "200px",
      marginTop: '20px',
      border: '3px dotted'
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
      <div style={boxStyling} className={`${className}` + (error && touched ? ' has-error ' : '')}>
        <Dropzone
          {...dropzone_options}
          onDrop={(f) => {

            console.log({f})

            cbFunction(f);
            return onChange(f);
          }}
          className="dropzone-input"
          name={name}
        >
          <p>{this.context.t('Tap to upload CV')}</p>
          {children}
        </Dropzone>
        {error && touched ? error : ''}
      </div>
    );
  }
}

FileInput.contextTypes = {
  t: PropTypes.func.isRequired
}


export default props => <Field {...props} component={FileInput} />;*/
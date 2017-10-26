import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, hasSubmitFailed } from 'redux-form'
//import FileField from 'redux-form-dropzone'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import Dropzone from "./dropzone"
import submit from "./submit"
import { Checkbox } from "material-ui"
import DropboxChooser from "react-dropbox-chooser"
import GooglePicker from "react-google-picker"

import RemoteSubmitButton from './RemoteSubmitButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';





class Later extends Component{
  handleCheckbox(){
    const { input: { value, onChange } } = this.props
    if(value === "Later"){
      onChange(null)
      return
    }
    window.alert(this.context.t('You have to email your CV within next 7 days to: _________'))
    onChange("Later")
  }
  render(){
    const { input: { value, onChange } } = this.props
    const { meta: { dirty, touched, error }} = this.props
    return(
      <div style={{marginTop: "10px"}}>
        <div style={{width: "50px", margin: "0 auto"}}>
          <Checkbox
            checked={value !== "Later" ? false : true}
            disableTouchRipple
            onCheck={this.handleCheckbox.bind(this)}
          />
        </div>
        <div>{this.context.t('I will send my CV later')}</div>
        <div style={{color: "red", marginTop: "3px"}}>
          {(dirty || touched) ? <span>{error}</span> : ""}
        </div>
      </div>
    )
  }
}

Later.contextTypes = {
  t: PropTypes.func.isRequired
}

class GoogleDrive extends Component{
 render(){
  const googleDriveButton = {
    width: "280px",
    height: "40px",
    border: "2px dashed",
    borderRadius: "30px",
    borderColor: "rgb(227,165,0)",
    backgroundColor: "rgb(255,240,200)",
    paddingTop: "20px",
    margin: "0 auto",
    cursor: "pointer"
  }
  const { input: { onChange } } = this.props
    return (
      <div style={{marginTop: "20px"}}>
        <GooglePicker clientId={'758323303943-6tvbe3i7228v37vhh3qtfauq9pjo9r4o.apps.googleusercontent.com'}
              developerKey={'AIzaSyDqMsJNo8zwmLrc_acfB3Bg4aLiESmOCRU'}
              scope={['https://www.googleapis.com/auth/drive.readonly']}
              onChange={(data) => {if(data.docs){onChange(data.docs[0].url)}}}
              multiselect={false}
              navHidden={true}
              authImmediate={false}
              mimeTypes={['application/vnd.google-apps.document', "text/plain",
                "application/pdf", "application/msword", "text/xml"]}
              viewId={'DOCS'}>
           <div><div style={googleDriveButton}>{this.context.t('Tap to upload CV from Google Drive')}</div></div>
        </GooglePicker>
      </div>
    )
  }
}

GoogleDrive.contextTypes = {
  t: PropTypes.func.isRequired
}

class Dropbox extends Component{
 render(){
  const dropboxButton = {
    width: "280px",
    height: "40px",
    border: "2px dashed",
    borderRadius: "30px",
    borderColor: "rgb(4,125,229)",
    backgroundColor: "rgb(219,236,254)",
    paddingTop: "20px",
    margin: "0 auto",
    cursor: "pointer"
  }
  const { input: { onChange } } = this.props
    return (
      <div style={{marginTop: "40px"}}>
        <DropboxChooser
          appKey={'7mx41a7h4zq8uvs'}
          success={files => onChange(files[0].link)}
          multiselect={false}
          extensions={['.pdf', '.doc', '.docx',
        '.rtf', '.wps', '.odt', '.wpd', '.txt',
        '.xml']} >
          <div><div style={dropboxButton}>{this.context.t('Tap to upload CV from Dropbox')}</div></div>
        </DropboxChooser>
      </div>
    )
  }
}

Dropbox.contextTypes = {
  t: PropTypes.func.isRequired
}


class FormEithPage extends Component{

  content(){
  const { handleSubmit, previousPage } = this.props
    return(
      <div>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <Field
              name="CV"
              type="text"
              component={Dropbox}
              label="CV"
            />
            <Field
              name="CV"
              type="text"
              component={GoogleDrive}
              label="CV"
            />

{/*              <Dropzone            //some other version if the original dropdone doesnt work
                name="CV"
                classNameLabel="file-input-label"
                className="file-input"
                dropzone_options={{
                  multiple: false,
                  accept: '.doc,.rtf,.wps,.odt,.wpd,.txt,.pdf,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }}
              >
                <span>Add more</span>
              </Dropzone>*/}
  
            <Field
              name="CV"
              type="text"
              component={Dropzone}
              label="CV"
            />
  {/*
           <Field
              name="CV"
              type="text"
              component={Later}
              label="CV"
            />*/}
          </Col>
        </Row>
        <Row center="xs" style={{marginTop: '20px'}}>
          <RaisedButton
            type="button"
            label={this.context.t("Prev")}
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label={this.context.t('Next')}
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </div>
    )
  }

 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', paddingTop: '10px'}} zDepth={2} rounded={false}>
            {this.content()}
          </Paper>
          :
          <div>
            {this.content()}
          </div>
        }
      </form>
    )
  }
}

FormEithPage.contextTypes = {
  t: PropTypes.func.isRequired
}

FormEithPage = connect(
  state => ({
    submitFailed: hasSubmitFailed('wizard')(state)
  })
)(FormEithPage)


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(FormEithPage)
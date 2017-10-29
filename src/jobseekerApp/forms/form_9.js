import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, hasSubmitFailed, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import Dropzone from "./dropzone"
import submit from "./submit"
import { Checkbox } from "material-ui"
import DropboxChooser from "react-dropbox-chooser"
import GooglePicker from "react-google-picker"
import _ from 'lodash'
import RemoteSubmitButton from './RemoteSubmitButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { change } from 'redux-form'







class RenderError extends Component {
  render(){
    let errorCopy = ''
    if(this.props.meta.error == 'Required'){
      errorCopy = this.context.t('Required')
    }
    else if(this.props.meta.error == 'All questions have to be answered'){
      errorCopy = this.context.t('All questions have to be answered')
    }
    if(this.props.meta.touched){  
      return(
        <div style={{color: "red"}}>{errorCopy}</div>
      )
    }
    else{
      return <div></div>
    }
  }
}

RenderError.contextTypes = {
  t: PropTypes.func.isRequired
}










const checkIfAllCustomQuestionsHaveBeenAnswered = values => {

  const errors = {}

  if (values.answers_to_extra_questions.length < values.numberOfCustomQuestionsJobseekerHasToAnswer) {
    errors.answers_to_extra_questions = 'All questions have to be answered'
  }

  return errors

}




class FormNinthPage extends Component{
  content(){
    const { handleSubmit, previousPage } = this.props

    console.log({props: this.props})

    return(
      <div>
        <Row center="xs" style={{height: 460, width: '80%', margin: '0 auto'}}>
          <Col xs={10} sm={10} md={3} lg={5}>

            {this.props.additionalQuestionsState && this.props.additionalQuestionsState.map((question)=>{

              this.props.dispatch(change('wizard', 'numberOfCustomQuestionsJobseekerHasToAnswer', this.props.additionalQuestionsState.length))

                return (
                  <div style={{border: '1px solid', height: '50px', marginBottom: '10px'}}>

                    <div style={{float: 'left', marginTop: '16px', width: 'calc(100% - 151px)'}}>
                      <div>{question.apply_questions && question.apply_questions.q_txt}</div>

                    </div>

                    <div style={{borderLeft: '1px solid grey', height: '100%', float: 'right', width: '150px'}}>

                      <div style={{height: '60%'}}>

                        <RadioButtonGroup name={question.q_id} onChange={(e)=>{

                            let hardCopyOfFormArray = [...this.props.answers_to_extra_questions]

                            let hardCopyFiltered = hardCopyOfFormArray.filter((q)=>{return q.q_id != question.q_id})

                            hardCopyFiltered.push({
                              q_id: question.q_id,
                              answer: e.target.value
                            })

                            this.props.dispatch(change('wizard', 'answers_to_extra_questions', hardCopyFiltered))

                          }}>

                          <RadioButton
                            disableTouchRipple
                            value="yes"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%', 
                              display: 'inline-block', width: '40%'}}
                          />
                          <RadioButton
                            disableTouchRipple
                            value="no"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%', 
                              display: 'inline-block', width: '40%'}}
                          />
                        </RadioButtonGroup>

                      </div>

                      <div>
                        <div style={{display: 'inline-block', width: '50%'}}>YES</div>
                        <div style={{display: 'inline-block', width: '50%'}}>NO</div>
                      </div>

                    </div>

                  </div>
                )
              })

            }

            <Field name="answers_to_extra_questions" component={RenderError} />

          </Col>
        </Row>
        <div style={{width: '100%', position: 'absolute', bottom: 0, contentAlign: 'center'}}>
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
        </div>
      </div>
    )
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', 
            paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
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

FormNinthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

const selector = formValueSelector('wizard')
FormNinthPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(FormNinthPage)

function mapStateToProps(state) {
  return {
    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  };
}


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate: checkIfAllCustomQuestionsHaveBeenAnswered
})(
  connect(mapStateToProps)(FormNinthPage)
)




















/*import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, hasSubmitFailed, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import Dropzone from "./dropzone"
import submit from "./submit"
import { Checkbox } from "material-ui"
import DropboxChooser from "react-dropbox-chooser"
import GooglePicker from "react-google-picker"
import _ from 'lodash'
import RemoteSubmitButton from './RemoteSubmitButton'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { change } from 'redux-form'


class FormNinthPage extends Component{


  content(){
    const { handleSubmit, previousPage } = this.props
    return(
      <div>
        <Row center="xs" style={{height: 460, width: '80%', margin: '0 auto'}}>
          <Col xs={10} sm={10} md={3} lg={5}>

            {this.props.additionalQuestionsState && this.props.additionalQuestionsState.map((question)=>{

                return (
                  <div style={{border: '1px solid', height: '50px', marginBottom: '10px'}}>

                    <div style={{float: 'left', marginTop: '16px', width: 'calc(100% - 151px)'}}>
                      {question.apply_questions && question.apply_questions.q_txt}
                    </div>

                    <div style={{borderLeft: '1px solid grey', height: '100%', float: 'right', width: '150px'}}>

                      <div style={{height: '60%'}}>




                        <RadioButtonGroup name={question.q_id} onChange={(e)=>{

                            let hardCopyOfFormArray = [...this.props.answers_to_extra_questions]

                            let hardCopyFiltered = hardCopyOfFormArray.filter((q)=>{return q.q_id != question.q_id})

                            hardCopyFiltered.push({
                              q_id: question.q_id,
                              answer: e.target.value
                            })

                            this.props.dispatch(change('wizard', 'answers_to_extra_questions', hardCopyFiltered))

                          }}>

                          <RadioButton
                            disableTouchRipple
                            value="yes"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%', 
                              display: 'inline-block', width: '40%'}}
                          />
                          <RadioButton
                            disableTouchRipple
                            value="no"
                            style={{marginLeft: '10%', contentAlign: 'center', height: '100%', 
                              display: 'inline-block', width: '40%'}}
                          />
                        </RadioButtonGroup>









                      </div>

                      <div>
                        <div style={{display: 'inline-block', width: '50%'}}>YES</div>
                        <div style={{display: 'inline-block', width: '50%'}}>NO</div>
                      </div>

                    </div>

                  </div>
                )
              })

            }

          </Col>
        </Row>
        <div style={{width: '100%', position: 'absolute', bottom: 0, contentAlign: 'center'}}>
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
        </div>
      </div>
    )
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', 
            paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
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

FormNinthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

const selector = formValueSelector('wizard')
FormNinthPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(FormNinthPage)

function mapStateToProps(state) {
  return {
    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  };
}


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(
  connect(mapStateToProps)(FormNinthPage)
)*/
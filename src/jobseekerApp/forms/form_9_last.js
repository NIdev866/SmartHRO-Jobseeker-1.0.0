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


class TickBox extends Component{
  handleCheckbox(){
    const { input: { value, onChange } } = this.props
    if(value === "Ticked"){
      onChange(null)
      console.log('HUUHUHEEE')
      return
    }
    else{
      onChange("Ticked")
    }
  }
  render(){
    const { input: { value, onChange } } = this.props
    const { meta: { dirty, touched, error }} = this.props

    let errorCopy = ''

    if(error == 'Required'){
      errorCopy = this.context.t('Required')
    }

    return(
      <div style={{marginTop: "10px"}}>
        <div style={{width: "50px", margin: "0 auto"}}>
          <Checkbox
            checked={value !== "Ticked" ? false : true}
            disableTouchRipple
            onCheck={this.handleCheckbox.bind(this)}
          />
        </div>
        <div style={{color: "red", marginTop: "3px"}}>
          {(dirty || touched) ? <span>{errorCopy}</span> : ""}
        </div>
      </div>
    )
  }
}

TickBox.contextTypes = {
  t: PropTypes.func.isRequired
}

class FormNinthPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      submittingDialogOpen: false,
    }
  }

  handleDialogContent(){
    if(this.props.createCampaignSubmittingStarted){
      return(
        <div style={{height: '100px'}}>
          <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
            Submitting...
          </div>
          <div style={{width: '49%', display: 'inline-block'}}>
            <CircularProgress size={80}  thickness={7}/>
          </div>
        </div>
      )
    }
    else if(this.props.createCampaignSubmittingSuccessful){
      return(
        <div style={{height: '100px'}}>
          <div style={{fontSize: '20px', marginTop: '34px', verticalAlign:"top", width: '49%', display: 'inline-block'}}>
            Submit successful
          </div>
          <div style={{width: '49%', display: 'inline-block', marginTop: '-10px'}}>
            <FontIcon style={{fontSize: '100px', color: 'green'}} className="material-icons">done</FontIcon>
          </div>
        </div>
      )
    }
    else if(this.props.createCampaignSubmittingFailed){
      return(
        <div style={{height: '100px', fontSize: '20px', marginTop: '34px', verticalAlign:"top", }}>
          <div>Submit failed. Please try again</div>
          <FlatButton
            label="Try again"
            onClick={()=> window.location.replace('/')}
          />
        </div>
      )
    }
  }


  displayAllFormValues(){
    if(this.props.all_values){

      let all_values_copy = {...this.props.all_values}

      delete all_values_copy.tickBox1
      delete all_values_copy.tickBox2
      delete all_values_copy.jobs_selected
      delete all_values_copy.emailCopy
      delete all_values_copy.CV
      delete all_values_copy.answers_to_extra_questions
      delete all_values_copy.numberOfCustomQuestionsJobseekerHasToAnswer


      let pairToReturn = {}

      return _.map(all_values_copy, function(value, key) {



        if(key == 'first_name'){
          pairToReturn = {
            key: 'First name',
            value: value
          }
        }
        else if(key == 'last_name'){
          pairToReturn = {
            key: 'Last name',
            value: value
          }
        }
        else if(key == 'contact_no'){
          pairToReturn = {
            key: 'Contact number',
            value: value
          }
        }
        else if(key == 'email_id'){
          pairToReturn = {
            key: 'Email',
            value: value
          }
        }
        else if(key == 'first_work_in_uk'){
          pairToReturn = {
            key: 'First work in uk',
            value: value
          }
        }
        else if(key == 'postal_code'){
          pairToReturn = {
            key: 'Postal code',
            value: value
          }
        }
        else if(key == 'self_employed'){
          pairToReturn = {
            key: 'Self employed',
            value: value
          }
        }
        else if(key == 'willing_to_travel'){
          pairToReturn = {
            key: 'Willing to travel',
            value: value
          }
        }
        else{
          pairToReturn = {
            key: key,
            value: value
          }
        }



        if(key == 'when_to_start_work'){
          pairToReturn.key = 'When to start work'
        }

        if(value == 'CAN_START_TOMORR'){
          pairToReturn.value = 'Can start tomorrow'
        }
        else if(value == 'CAN_START_DAYAFTER'){
          pairToReturn.value = 'Can start day after'
        }
        else if(value == 'CAN_START_NEXTWEEK'){
          pairToReturn.value = 'Can start next week'
        }
        else if(value == 'CAN_START_INTWOWEEKS'){
          pairToReturn.value = 'Can start in two weeks'
        }



        return <div><span>{pairToReturn.key}</span>{": "}<span>{pairToReturn.value}</span></div>
      });
    }
  }

  content(){
    const { handleSubmit, previousPage } = this.props
    return(
      <div>
        <Row center="xs" style={{height: 460, width: '80%', margin: '0 auto'}}>
          <Col xs={10} sm={10} md={3} lg={5}>

          <div style={{height: 'calc(100% - 300px)', overflowY: 'scroll', 
            position: 'absolute', width: '80%', border: '1px solid grey'}}>
            {this.displayAllFormValues()}

            {this.props.answers_to_extra_questions && this.props.answers_to_extra_questions !== [] && this.props.answers_to_extra_questions.map((question)=>{

                if(this.props.additionalQuestionsState){

                  return this.props.additionalQuestionsState.map((questionFromAll)=>{

                    if(questionFromAll.apply_questions.q_id == question.q_id){

                      return (
                        <div>
                          <span>
                            {questionFromAll.apply_questions.q_txt}
                          </span>
                          {": "}
                          <span>
                            {question.answer}
                          </span>
                        </div>
                      
                      )

                    }

                  })

                }

              })

            }

          </div>
          <div style={{left: 0, width: '100%', position: 'absolute', bottom: '60px'}}>
            <div>
              <div style={{width: '10%', display: 'inline-block'}}>
                <Field
                    name="tickBox1"
                    type="text"
                    component={TickBox}
                    label="tickBox1"
                  />
              </div>
              <div style={{width: '60%', display: 'inline-block'}}>
                {this.context.t('I confirm all the details above are correct and true to the best of my ability')}
              </div>
            </div>
            <div style={{marginTop: '15px'}}>
              <div style={{width: '10%', display: 'inline-block'}}>
                <Field
                    name="tickBox2"
                    type="text"
                    component={TickBox}
                    label="tickBox2"
                  />
              </div>
              <div style={{width: '60%', display: 'inline-block'}}>
              {this.context.t('I agree for my information to be processed for recruitment purposes only')}
              </div>
            </div>
          </div>

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
          <RemoteSubmitButton />
        </div>
      </div>
    )
  }

  render(){

    if(!this.state.submittingDialogOpen){
      if(this.props.createCampaignSubmittingStarted ||
         this.props.createCampaignSubmittingSuccessful ||
         this.props.createCampaignSubmittingFailed){
        this.setState({submittingDialogOpen: true})
      }
    }

    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>

        <Dialog
          modal={true}
          open={this.state.submittingDialogOpen}
        >
          {this.handleDialogContent()}
        </Dialog>

        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
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

FormNinthPage = connect(
  state => ({
    submitFailed: hasSubmitFailed('wizard')(state)
  })
)(FormNinthPage)


FormNinthPage = connect(
  state => {
    let all_values = state.form.wizard.values
    return {
      all_values
    }
  }
)(FormNinthPage)

const selector = formValueSelector('wizard')
FormNinthPage = connect(
  state => {
    const answers_to_extra_questions = selector(state, 'answers_to_extra_questions')
    return {
      answers_to_extra_questions
    }
  }
)(FormNinthPage)

function mapStateToProps(state){
  return{
    createCampaignSubmittingStarted: state.jobseeker.createCampaignSubmittingStarted,
    createCampaignSubmittingSuccessful: state.jobseeker.createCampaignSubmittingSuccessful,
    createCampaignSubmittingFailed: state.jobseeker.createCampaignSubmittingFailed,

    additionalQuestionsState: state.jobseeker.additionalQuestionsState
  }
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(
  connect(mapStateToProps)(FormNinthPage)
)
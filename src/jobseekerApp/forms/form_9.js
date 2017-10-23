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
  displayAllFormValues(){
    if(this.props.all_values){

      let all_values_copy = {...this.props.all_values}

      delete all_values_copy.tickBox1
      delete all_values_copy.tickBox2
      delete all_values_copy.jobs_selected
      delete all_values_copy.emailCopy


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

  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto', paddingTop: '10px', position: 'relative'}} zDepth={2} rounded={false}>
            <Row center="xs" style={{height: 460, width: '80%', margin: '0 auto'}}>
              <Col xs={10} sm={10} md={3} lg={5}>

              <div style={{position: 'absolute', width: '80%'}}>{this.displayAllFormValues()}</div>

              <div style={{position: 'absolute', top: '370px'}}>
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
            <Row center="xs" style={{marginTop: '20px'}}>
              <RaisedButton
                type="button"
                label={this.context.t("Prev")}
                primary={true}
                onClick={previousPage}
                style={styles.raisedButtonStyle}
              />
              <RemoteSubmitButton />
            </Row>
          </Paper>
          :
          <div>
            <Row center="xs" style={{height: 360}}>
              <Col xs={10} sm={10} md={3} lg={5}>

              <div style={{position: 'absolute', width: '100%', margin: '0 auto'}}>{this.displayAllFormValues()}</div>

              <div style={{position: 'absolute', top: '330px'}}>
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
            <Row center="xs" style={{marginTop: '20px'}}>
              <RaisedButton
                type="button"
                label={this.context.t("Prev")}
                primary={true}
                onClick={previousPage}
                style={styles.raisedButtonStyle}
              />
              <RemoteSubmitButton />
            </Row>
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


export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onSubmit: submit,
  validate
})(FormNinthPage)
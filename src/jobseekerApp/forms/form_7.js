import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { CAN_START_TOMORR,
         CAN_START_DAYAFTER,
         CAN_START_NEXTWEEK,
         CAN_START_INTWOWEEKS
       } from './formValues'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

class RenderError extends Component {
  render(){
    let errorCopy = ''
    if(this.props.meta.error == 'Required'){
      errorCopy = this.context.t('Required')
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

class FormSeventhPage extends Component{
  content(){    
    const { handleSubmit, previousPage } = this.props
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const radioParentStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative",
    }
    const buttonStyle1 = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px",
    }
    const buttonStyle2 = {
      display: "inline-block",
      width: "45px",
      marginLeft: "27px",
    }
    return(
      <div>
        <Row style={{height: 330, width: '80%', margin: '0 auto'}}>
          <Row center="xs">
            <Col xs={12} sm={6} md={3} lg={5}>
              <div style={{marginTop: "50px"}}>
                <div style={{marginTop: "30px", marginBottom: "33px"}}>
                  <div style={{marginBottom: "-30px"}}>{this.context.t('Are you willing to travel to other places?')}</div>
                  <div style={radiosParentDiv}>
                    <Field style={radioParentStyle} name="willing_to_travel" component={RadioButtonGroup}>
                      <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                      <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
                    </Field>
                    <div style={{...radioParentStyle}}>
                      <span style={{marginRight: "80px"}}>{this.context.t('Yes')}</span><span>{this.context.t('No')}</span>
                    </div>
                    <Field name="willing_to_travel" component={RenderError} />
                  </div>
                </div>
              </div>
            <Field name="when_to_start_work" component={SelectField}
                  selectedMenuItemStyle={{color: "#00BCD4"}}
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}}
                  hintText={this.context.t("When can you start?")}>
              <MenuItem value={CAN_START_TOMORR} primaryText="I can start from tomorrow"/>
              <MenuItem value={CAN_START_DAYAFTER} primaryText="From day after tomorrow"/>
              <MenuItem value={CAN_START_NEXTWEEK} primaryText="From next week"/>
              <MenuItem value={CAN_START_INTWOWEEKS} primaryText="After two weeks"/>
            </Field>
            <Field name="when_can_start" component={RenderError} />
            </Col>
          </Row>
        </Row>
        <Row center="xs">
          <Col xs={12} sm={6} md={3} lg={5}>
            <RaisedButton
              type="button"
              label={this.context.t('Prev')}
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
          </Col>
        </Row>
      </div>
    )
  }
  render(){
    const { handleSubmit, previousPage } = this.props
    return(
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

FormSeventhPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSeventhPage)


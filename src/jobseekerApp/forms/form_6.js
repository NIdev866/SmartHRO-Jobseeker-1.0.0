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

const renderRadioError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class FormSixthPage extends Component{
  render(){
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
      <form onSubmit={handleSubmit}>
        <Row style={{height: 330}}>
          <Row center="xs">
            <Col xs={12} sm={6} md={3} lg={5}>
              <div style={{marginTop: "50px"}}>
                <div style={{marginTop: "30px", marginBottom: "33px"}}>
                  <div style={{marginBottom: "-30px"}}>{this.context.t('Are you currently a student?')}</div>
                  <div style={radiosParentDiv}>
                    <Field style={radioParentStyle} name="student" component={RadioButtonGroup}>
                      <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                      <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
                    </Field>
                    <div style={{...radioParentStyle}}>
                      <span style={{marginRight: "80px"}}>{this.context.t('Yes')}</span><span>{this.context.t('No')}</span>
                    </div>
                    <Field name="student" component={renderRadioError} />
                  </div>
                </div>
              </div>
              <div style={{marginTop: "40px"}}>
                <div style={{marginTop: "30px", marginBottom: "33px"}}>
                  <div style={{marginBottom: "-30px"}}>{this.context.t('Is this your first job in the UK?')}</div>
                  <div style={radiosParentDiv}>
                    <Field style={radioParentStyle} name="first_work_in_uk" component={RadioButtonGroup}>
                      <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                      <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
                    </Field>
                    <div style={{...radioParentStyle}}>
                      <span style={{marginRight: "80px"}}>{this.context.t('Yes')}</span><span>{this.context.t('No')}</span>
                    </div>
                    <Field name="first_work_in_uk" component={renderRadioError} />
                  </div>
                </div>
              </div>
              <div style={{marginTop: "40px"}}>
                <div style={{marginTop: "30px", marginBottom: "33px"}}>
                  <div style={{marginBottom: "-30px"}}>{this.context.t('Are you currently self employed?')}</div>
                  <div style={radiosParentDiv}>
                    <Field style={radioParentStyle} name="self_employed" component={RadioButtonGroup}>
                      <RadioButton disableTouchRipple style={buttonStyle1} value="yes"/>
                      <RadioButton disableTouchRipple style={buttonStyle2} value="no"/>
                    </Field>
                    <div style={{...radioParentStyle}}>
                      <span style={{marginRight: "80px"}}>{this.context.t('Yes')}</span><span>{this.context.t('No')}</span>
                    </div>
                    <Field name="self_employed" component={renderRadioError} />
                  </div>
                </div>
              </div>
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
      </form>
    )
  }
}

FormSixthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSixthPage)

import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid';
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import {age, ageRanges} from './formValues'
import { countries } from './countries'

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class FormSecondPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      loader: false
    }
    this.handleLoaderState = this.handleLoaderState.bind(this)
  }

  renderAgeSelector(ageDataSet){
    return ageDataSet.map(val =>
      <MenuItem key={val.id} value={val.value} primaryText={val.primaryText}/>
    )
  }
  renderCountrySelector(countryDataSet){
    return countryDataSet.map(country =>
      <MenuItem value={country} primaryText={country}/>
  )}
  
  handleLoaderState(){
    this.setState({loader: true}, ()=>{
      setTimeout(()=>{this.setState({loader:false})}, 1000)
    })
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    const radiosParentDiv = {
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
      marginTop: "30px",
    }
    const genderParentStyle = {
      display: "inline-block",
      width: "300px",
      position: "relative",
    }
    const genderStyle = {
      display: "inline-block",
      width: "45px",
      marginRight: "30px"
    }
    const genderStyle2 = {
      display: "inline-block",
      width: "45px",
      marginLeft: "30px"
    }
    return (
      <form onSubmit={handleSubmit}>
        <div style={{marginTop: "20px"}}>
          <div style={{marginTop: "30px", marginBottom: "33px"}}>
            <div style={{marginBottom: "-30px"}}>{this.context.t('Gender')}</div>
            <div style={radiosParentDiv}>
              <Field style={genderParentStyle} name="gender" component={RadioButtonGroup}>
                <RadioButton disableTouchRipple style={genderStyle} value="male"/>
                <RadioButton disableTouchRipple style={genderStyle2} value="female"/>
              </Field>
              <div style={{...genderParentStyle, marginLeft: "5px"}}>
                <span style={{marginRight: "65px"}}>{this.context.t('Male')}</span><span>{this.context.t('Female')}</span>
              </div>
              <Field name="gender" component={renderError} />
            </div>
          </div>
          <div style={{marginBottom: "20px"}}>
            <Field name="age" component={SelectField}
                  selectedMenuItemStyle={{color: "#00BCD4"}}
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}}
                  hintText={this.context.t('Select your age group')} >
                  {this.renderAgeSelector(ageRanges)}
            </Field>
            <Field name="age" component={renderError} />
          </div>
        </div>
        <Col xs={12} sm={6} md={3} lg={5} style={{marginTop: "113px"}}>
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
      </form>
    )
  }
}

FormSecondPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSecondPage)

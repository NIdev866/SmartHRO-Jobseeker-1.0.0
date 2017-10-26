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

class FormSecondPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      loader: false
    }
    this.handleLoaderState = this.handleLoaderState.bind(this)
  }
  renderAgeSelector(ageDataSet){
    return ageDataSet.map(val =>{

      let valCopy = ''

      if(val.primaryText == "I'm between 18-20 yrs old"){
        valCopy = this.context.t("I'm between 18-20 yrs old")
      }
      if(val.primaryText == "I'm between 21-24 yrs old"){
        valCopy = this.context.t("I'm between 21-24 yrs old")
      }
      if(val.primaryText == "I'm between 25-49 yrs old"){
        valCopy = this.context.t("I'm between 25-49 yrs old")
      }
      if(val.primaryText == "I'm between 50-59 yrs old"){
        valCopy = this.context.t("I'm between 50-59 yrs old")
      }
      if(val.primaryText == "I'm between 60+ yrs old"){
        valCopy = this.context.t("I'm between 60+ yrs old")
      }
      return <MenuItem key={val.id} value={val.value} primaryText={valCopy}/>
    })
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

  content(){
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
    return(
      <div>
        <div style={{marginTop: "20px", width: '80%', margin: '0 auto'}}>
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
              <Field name="gender" component={RenderError} />
            </div>
          </div>
          <div style={{marginBottom: "20px"}}>
            <Field name="age" component={SelectField}
                  selectedMenuItemStyle={{color: "#00BCD4"}}
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}}
                  hintText={this.context.t('Select your age group')} >
                  {this.renderAgeSelector(ageRanges)}
            </Field>
            <Field name="age" component={RenderError} />
          </div>
        <div>
          <Field name="postal_code" type="text" component={renderField}
                label={this.context.t('Your postal code (to see distance only)')} >
          </Field>
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
          <div style={{marginTop: "20px"}}>
            {this.content()}
          </div>
        }
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

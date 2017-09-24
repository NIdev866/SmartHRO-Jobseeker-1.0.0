/*import React, { Component } from "react"
import Maps from "./Maps"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import MapsAutocomplete from "./mapsAutocomplete"
import workBox from "./workBox"

const WorkBoxParent = (props)=>{
  const workBoxStyling = {
    position: "absolute", 
    top: "364", 
    marginLeft: "2"
  }
  return(
    <div style={workBoxStyling}>
    {props.display_work_box && <Field 
        routes={props.routes}
        durations={props.durations}
        zoom={props.zoom}
        userMarker={props.userMarker}
        component={workBox}
        jobSelectedNamesArray={props.jobSelectedNamesArray}
      />}
    </div>
  )
}
const houseNumberInput = (props) => {
  const houseNumberDivStyling = {
    position: "absolute", 
    top: "76", 
    padding: "4px",
    zIndex: "1",
  }
  const textBoxStyling = {
    width: "176px",
    padding: "4px"
  }
  const { meta: { touched, dirty, error } } = props
  const errorStyling = {
    position: "absolute",
    display: "inline",
    backgroundColor: "white",
    width: "70px",
    marginTop: "4px",
    color: "red"
  }
  return (
    <div style={houseNumberDivStyling}>
      <input type="text" style={textBoxStyling} placeholder="House Number (Required)" {...props.input}/>
      {(dirty || touched) ? <div style={errorStyling}>{error}</div> : ""}
    </div>
  )
}

const MapsAutocompleteParent = props =>{
  const inputStyling = {
    position: "absolute", 
    top: "110", 
    marginLeft: "4"
  }
  return(
    <div style={inputStyling}>
      <Field 
        userMarker={props.userMarker}
        createRoutesAndDuration={props.createRoutesAndDuration}
        name="postcode"
        type="text"
        component={MapsAutocomplete}
        updateUserMarker={props.updateUserMarker} //CAN DEFFO PASS TO FIELD!!
      />
    </div>
  )
}

class MapParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayBoxes: false
    }
    setTimeout(()=>{
      this.setState({
        displayBoxes: true
      })
    },950)
  }
  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row style={{height: 360}}>
          <Field 
            routes={this.props.routes}
            geocodedPostcodesArrayState={this.props.geocodedPostcodesArrayState}
            userMarker={this.props.userMarker}
            component={Maps} 
            zoom={8}
            center={{ lat: 51.537452, lng: -0.497681}}
            containerElement={<div style={{height: 100+"%"}} />}
            mapElement={<div style={{height: 100+"%"}} />}
          />
          {this.state.displayBoxes && 
            <MapsAutocompleteParent
              userMarker={this.props.userMarker}
              createRoutesAndDuration={this.props.createRoutesAndDuration}
              updateUserMarker={this.props.updateUserMarker}
            />}
          {this.state.displayBoxes && <Field 
            name="houseNumber"
            type="text"
            component={houseNumberInput}
          />}
          {this.state.displayBoxes && <WorkBoxParent 
            display_work_box={this.props.display_work_box}
            routes={this.props.routes}
            durations={this.props.durations}
            zoom={8}
            userMarker={this.props.userMarker}
            jobSelectedNamesArray={this.props.jobSelectedNamesArray}
            component={workBox}
          />}
      </Row>
      <Row center="xs">
        <Col xs={12} sm={6} md={3} lg={5}>
          <RaisedButton
            type="button"
            label="Prev"
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label="Next"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Col>
      </Row>
    </form>
  )}
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(MapParent)
*/
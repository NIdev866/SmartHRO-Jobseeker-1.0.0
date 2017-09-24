/*import React, { Component } from "react"
import Maps from "./Maps"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import MapsAutocomplete from "./mapsAutocomplete"
import workBox from "./workBox"
import { connect } from "react-redux"
import jobsDb from "../../jobs.json"
import FormFive from "./form_5"


const google = window.google


class MapPageWrapper extends Component {
  constructor(props){
    super(props)
    this.createRoutesAndDuration = this.createRoutesAndDuration.bind(this)
    this.createInitialMarkers = this.createInitialMarkers.bind(this)
    let jobsSelectedValues = this.props.jobsSelectedValues
    let postcodes = []
    let names = []
    for(let i = 0; i < jobsSelectedValues.length; i++){
      for(let j = 0; j < jobsDb.length; j++){
        if(jobsSelectedValues[i] === jobsDb[j].id){
          postcodes.push(jobsDb[j]["work_postalcode"])
          names.push(jobsDb[j]["title"])
        }
      }
    }
    this.state = {
      origin: null,
      destination: null,
      routes: null,
      display_work_box: false,
      durations: null,
      postcodesArray: postcodes,
      jobSelectedNamesArray: names,
      geocodedPostcodesArrayState: []
    }
    this.createInitialMarkers()
  }
  createInitialMarkers(){
    let geocoder = new google.maps.Geocoder();
    for(let i = 0; i < this.state.postcodesArray.length; i++){
      geocoder.geocode({'address': this.state.postcodesArray[i]}, (results, status)=> {
        if (status === 'OK') {
          let geocodedPostcodesArray = this.state.geocodedPostcodesArrayState.slice()
          geocodedPostcodesArray.push(results[0].geometry.location)
          this.setState({ geocodedPostcodesArrayState: geocodedPostcodesArray })
        }
      })
    }
  }  
  handleWorkBoxDisplay(value){
    this.setState({
      display_work_box: value
    })
  }
  createRoutesAndDuration(){      
    for(let i = 0; i < this.state.geocodedPostcodesArrayState.length; i++){
      this.setState({
      origin: this.props.userMarker.position,
      destination: this.state.geocodedPostcodesArrayState,
      routes: null,
      }, () => {
        let routesArray = []
        let durationsArray = []
        let lengthToMap = this.state.destination.length
        let routesMappedAlready = 0
        let durationsMappedAlready = 0
        this.state.destination.map((venue, i) => {
          const RoutesService = new google.maps.DirectionsService();
          RoutesService.route({
            origin: this.state.origin,
            destination: venue,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => { 
            if(this.props.userMarker.position.lat !== 0){
              routesArray.push(result)
              this.handleWorkBoxDisplay(true)
            }
            else{
              this.handleWorkBoxDisplay(false)
            }
            routesMappedAlready++
            if(routesMappedAlready === lengthToMap){
              setRoutes()
            }
          })
          const DurationService = new google.maps.DistanceMatrixService();
          DurationService.getDistanceMatrix({
              origins: [this.props.userMarker.position],
              destinations: this.state.geocodedPostcodesArrayState,
              travelMode: 'DRIVING',
              avoidHighways: false,
              avoidTolls: false,
            }, (result, status) => { 
            if(this.props.userMarker.position.lat !== 0){
              durationsArray.push(result)
            }
            durationsMappedAlready++
            if(durationsMappedAlready === lengthToMap){
              setDurations()
            }
          })
        })
        let setRoutes = ()=>{
          if(routesArray.length >= 1){
            this.setState({
              routes: routesArray,
            })
          }
        }
        let setDurations = ()=>{
          if(durationsArray.length >= 1){
            this.setState({
              durations: durationsArray,
            })
          }
        }
      })
    }
  }
  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <FormFive
        display_work_box={this.state.display_work_box}
        createRoutesAndDuration={this.createRoutesAndDuration}
        routes={this.state.routes}
        durations={this.state.durations}
        previousPage={this.props.previousPage}
        onSubmit={this.props.onSubmit}
        userMarker={this.props.userMarker}
        updateUserMarker={this.props.updateUserMarker}
        geocodedPostcodesArrayState={this.state.geocodedPostcodesArrayState}
        jobSelectedNamesArray={this.state.jobSelectedNamesArray}
      />
    )
  }
}

MapPageWrapper = connect(
  state => {
    if(state.form.wizard.values){
      return{
        jobsSelectedValues: state.form.wizard.values.jobsSelected,
      }
    }
  }
)(MapPageWrapper)

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(MapPageWrapper)
*/
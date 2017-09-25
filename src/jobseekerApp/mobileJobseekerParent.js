/*import React, { Component, PropTypes } from 'react'
import FormFirstPage from './forms/form_1'
import FormSecondPage from './forms/form_2'
import FormThirdPage from './forms/form_3'
import FormFourthPage from './forms/form_4'
import FormFifthPage from './forms/form_5'
import FormSixthPage from "./forms/form_6"
import FormSeventhPage from "./forms/form_7"
import FormEithPage from "./forms/form_8"
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './forms/form_material_styles'
import TopCounter from "./topCounter"
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import MapPageWrapper from "./forms/mapPageWrapper"


import MobileSlideComponent from "./mobileSlideComponent"
import MobileMapComponent from "./mobileMapComponent"
import { fetchCompanies, addDurationToCompanies } from '../actions'
import { connect } from 'react-redux'
import { Marker } from "react-google-maps"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

config()
const google = window.google





class JobseekerParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider: "closed"
    }
    this.sliderClick = this.sliderClick.bind(this)
    this.createMarkersForCompanies = this.createMarkersForCompanies.bind(this)
    this.createRoutes = this.createRoutes.bind(this)
    this.setRoutes = this.setRoutes.bind(this)
    this.autocompleteOnChange = this.autocompleteOnChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  sliderClick(){
    const { slider } = this.state
    this.setState({slider: slider == "closed" ? "open" : "closed"})
  }







  createMarkersForCompanies(companies){
    let mappedMarkers = []
    mappedMarkers = this.props.companies.map((companyLatAndLng) => {
      let marker = {
        position: {
          lat: companyLatAndLng.lat,
          lng: companyLatAndLng.lng
        }
      }
      return (
        <Marker 
          {...marker} 
        />
      )
    })
    return mappedMarkers
  }







  updateUserMarker(newMarker={}){
    this.setState({
      userMarker: newMarker
    })
  }
  createMarkersForCompanies(companies){
    let mappedMarkers = []
    mappedMarkers = this.props.companies.map((companyLatAndLng) => {
      let marker = {
        position: {
          lat: companyLatAndLng.lat,
          lng: companyLatAndLng.lng
        }
      }
      return (
        <Marker 
          {...marker} 
        />
      )
    })
    return mappedMarkers
  }

  componentWillMount(){
    this.props.fetchCompanies()
  }









  autocompleteOnChange(address){
    this.setState({ address })
  }
  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {

        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })

        this.handleUpdatingMarker(lat, lng)
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })

        this.handleUpdatingMarker(0, 0)
      })
  }

  handleUpdatingMarker(lat, lng){
    let newMarker = {
      position: {
        lat, lng
      }
    }
    this.updateUserMarker(newMarker)
    this.createRoutes()
    this.createDurations()
  }


  renderGeocodeSuccess(lat, lng) {}
  renderGeocodeFailure(err) {
    return (
      <div 
        className="alert alert-danger" 
        role="alert"
        style={{backgroundColor: "white"}}
      >
        Not found.
      </div>
    )
  }


  createRoutes(){      
    for(let i = 0; i < this.props.companies.length; i++){
      let routesArray = []
      let lengthToMap = this.props.companies.length
      let routesMappedAlready = 0
      this.props.companies.map((venue, i) => {

        const RoutesService = new google.maps.DirectionsService();
        RoutesService.route({
          origin: this.state.userMarker.position,
          destination: {lat: venue.lat, lng: venue.lng},
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => { 
          if(this.state.userMarker.position.lat !== 0){
            routesArray.push(result)
          }
          routesMappedAlready++
          if(routesMappedAlready === lengthToMap){
            this.setRoutes(routesArray)
          }
        })
      })
    }
  }
  setRoutes(routesArray){
    if(routesArray.length >= 1){
      this.setState({
        routes: routesArray,
      })
    }
  }
  createDurations(){
    let allCompaniesWithDurations = this.props.companies.map((company)=>{





      let DurationService = new google.maps.DistanceMatrixService();
      DurationService.getDistanceMatrix({
          origins: [this.state.userMarker.position],
          destinations: [company],
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false,
        }, (result, status) => { 

          company.duration = result.rows[0].elements[0].duration.text
      })




      return company
    })

    this.props.addDurationToCompanies(allCompaniesWithDurations)




  }
  setDurations(durationsArray){
    if(durationsArray.length >= 1){
      this.setState({
        durations: durationsArray,
      })
    }
  }













  render() {
    let sliderStyle = {}
    if(this.state.slider == "closed"){
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "50px",
        backgroundColor: "white",
        borderTop: "1px solid #CCCCCC",
        width: "100vw",
        top: "calc(100vh - 51px)"
      }
    }
    else{
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "100vh",
        backgroundColor: "white",
        width: "100vw",
        top: "0px"
      }
    }
    let openIconStyle = {}
    if(this.state.slider == "closed"){
      openIconStyle = {
        transition: "all .4s ease-in-out",
        width: "50px", 
        marginLeft: "50%"

      }
    }
    else{
      openIconStyle = {
        transition: "all .4s ease-in-out",
        width: "50px", 
        marginLeft: "50%",
        transform: "rotate(180deg)"
      }
    }




    const styleObj = {
      input: { padding: "6px", width: "calc(100vw - 24px)"},
      autocompleteContainer: { 
      zIndex: "99999", width: "100%"},
      autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
      autocompleteItemActive: { color: '#00BCD4' },
      googleLogoImage: { width: "10px"}
    }
    const inputStyling = {
      position: "fixed", 
      top: "4", 
      marginLeft: "4"
    }
    const inputProps = {
      value: this.state.address,
      onChange: this.autocompleteOnChange,
      placeholder: 'Your rough location to see distance (Optional)',
      autoFocus: true,
    }







    return (
        <div style={{position: "relative", width: "100vw", height: "100vh"}}>

          <div style={{position: "absolute", height: "calc(100vh - 50px)", width: "100vw"}}>



            {this.props.companies &&
              <MobileMapComponent 
                zoom={10}
                center={{ lat: 51.537452, lng: -0.497681}}
                containerElement={<div style={{height: 100+"%"}} />}
                mapElement={<div style={{height: 100+"%"}} />}
                mappedMarkers={this.props.allCompaniesLatAndLng && this.createMarkersForCompanies(this.props.allCompaniesLatAndLng)}
                companies={this.props.companies}
                routes={this.state.routes}

              />
            }





            <div style={inputStyling}>
              <PlacesAutocomplete 
                onSelect={this.handleSelect}
                styles={styleObj} 
                inputProps={inputProps} 
                onEnterKeyDown={this.handleSelect}
              />
              {this.state.loading ? <div style={{backgroundColor: "white"}}>Loading...</div> : null}
              {!this.state.loading && this.state.geocodeResults ?
                    <div className='geocoding-results'>{this.state.geocodeResults}</div> :
                  null}
            </div>





          </div>

          <div style={sliderStyle}>


            <MobileSlideComponent
              sliderClick={this.sliderClick}
              openIconStyle={openIconStyle}
             />


          </div>


        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    companies: state.jobseeker.companies,
    companiesWithDurations: state.jobseeker.companiesWithDurations
  };
}

export default connect(mapStateToProps, { fetchCompanies, addDurationToCompanies })(JobseekerParent)*/
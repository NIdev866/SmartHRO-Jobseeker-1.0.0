import React, { Component, PropTypes } from 'react'
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
import DesktopJobCards from "./desktopJobCards"
import MapPageWrapper from "./forms/mapPageWrapper"
import { connect } from 'react-redux'
import { fetchCompanies } from '../actions'
import { Marker, GoogleMap, DirectionsRenderer } from "react-google-maps"

import DesktopMapComponent from "./desktopMapComponent"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

config()
const google = window.google













class JobseekerParent extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateUserMarker = this.updateUserMarker.bind(this)
    this.createMarkersForCompanies = this.createMarkersForCompanies.bind(this)
    this.autocompleteOnChange = this.autocompleteOnChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    this.handleUpdatingMarker = this.handleUpdatingMarker.bind(this)
    this.createRoutes = this.createRoutes.bind(this)
    this.setRoutes = this.setRoutes.bind(this)
    this.state = {
      slide: "toLeft",
      page: 1,
      userMarker: {
        position: {
          lat: 0,
          lng: 0
        }
      },
      address: "",
      geocodeResults: null,
      loading: false
    }
  }
  nextPage() {
    this.setState({ 
      page: this.state.page + 1,
      slide: "toLeft"
    })
  }
  previousPage() {
    this.setState({ 
      page: this.state.page - 1,
      slide: "toRight"
    })
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

  render() {
    const footerStyle = {
      textAlign: "center",
      position: "fixed",
      left: "0",
      bottom: "0",
      paddingBottom: "2px",
      minHeight: "40px",
      width: "100%",
      borderTop: "1px solid",
      borderColor: "#DCDCDC",
      backgroundColor: "white",
      zIndex: "8000",
      overflow: "hidden"
    }





    const styleObj = {
      input: { padding: "6px", width: "280px"},
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






    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
            {page === 1 && 
              <div>
                <div style={{float: "left", width: "60%", position: "fixed", height: "100vh"}}>
                  






                {this.props.companies &&
                  <DesktopMapComponent 
                    zoom={10}
                    center={{ lat: 51.537452, lng: -0.497681}}
                    containerElement={<div style={{height: 100+"%"}} />}
                    mapElement={<div style={{height: 100+"%"}} />}
                    mappedMarkers={this.props.companies && this.createMarkersForCompanies(this.props.companies)}
                    companies={this.props.companies}
                    routes={this.state.routes}
                  />
                }

                </div>

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

                <div style={{width: "40%", float: "right"}}>
                  <div style={{marginBottom: "90px", paddingLeft: "10px", paddingRight: "10px", borderLeft: "1px solid grey", marginTop: "-20px"}}>
                    <h2>PLEASE APPLY FOR JOBS BY REGISTERING WITH US.</h2>
                    <h3>Select maximum 3 job boxes to apply for them.<br/>
                        Click on the job to read more about it</h3>
                    <DesktopJobCards 
                      allCampaigns={this.props.allCampaigns}
                      userMarker={this.state.userMarker}
                    />
                  </div>
                </div>
              </div>
            }




















            {page > 1 && 
              <TopCounter 
                finishedStep={this.state.page}
              />}
        <Row center="xs">
          <Col xs={12} sm={12} md={2} lg={8}>
            {page === 1 && <div style={footerStyle}>
              <RaisedButton primary={true} 
              style={styles.raisedButtonStyle}
              label="APPLY"
              onClick={this.nextPage}/></div>}
              <Animation
                transitionName={this.state.slide}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={500}
              >
                {page === 2 &&
                  <FormFirstPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage} 
                  />}
                {page === 3 &&
                  <FormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 4 &&
                  <FormThirdPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 5 &&
                  <FormFourthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 6 &&
                  <MapPageWrapper 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    userMarker={this.state.userMarker}
                    updateUserMarker={this.updateUserMarker}
                  />}
                {page === 7 &&
                  <FormSixthPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 8 &&
                  <FormSeventhPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 9 &&
                  <FormEithPage 
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                  />}
            </Animation>
          </Col>
        </Row>
      </div>
    )
  }
}

JobseekerParent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}



function mapStateToProps(state) {
  return {
    companies: state.jobseeker.companies
  };
}

export default connect(mapStateToProps, { fetchCompanies })(JobseekerParent)
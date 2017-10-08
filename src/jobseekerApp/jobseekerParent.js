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
import { connect } from 'react-redux'
import { fetchAllCampaigns, fetchCompanies } from '../actions'
import { Marker, GoogleMap, DirectionsRenderer } from "react-google-maps"

import MapComponent from "./mapComponent"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import ReactResizeDetector from 'react-resize-detector';
import JobCards from './jobCards'
import SlideComponent from './slideComponent'
import {setLanguage} from 'redux-i18n'

config()
const google = window.google



class JobseekerParent extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateUserMarker = this.updateUserMarker.bind(this)
    this.autocompleteOnChange = this.autocompleteOnChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    this.handleUpdatingMarker = this.handleUpdatingMarker.bind(this)
    this.createRoutes = this.createRoutes.bind(this)
    this.setRoutes = this.setRoutes.bind(this)
    this._onResize = this._onResize.bind(this)
    this.sliderClick = this.sliderClick.bind(this)
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
      loading: false,
      screenWidth: null,
      slider: "closed"
    }
    this.languages = ['pl', 'en']
  }
  sliderClick(){
    const { slider } = this.state
    this.setState({slider: slider == "closed" ? "open" : "closed"})
  }
  _onResize(width) {
    this.setState({screenWidth: width})

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

  componentWillMount(){
    this.props.fetchAllCampaigns()    
    this.props.fetchCompanies()
    this.props.dispatch(setLanguage('en'))
  }

  onChangeLang = (e) => {
    this.props.dispatch(setLanguage(e.target.value))
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
        {this.context.t('Not found.')}
      </div>
    )
  }


  createRoutes(){      
    for(let i = 0; i < this.props.allCampaigns.length; i++){
      let routesArray = []
      let lengthToMap = this.props.allCampaigns.length
      let routesMappedAlready = 0
      this.props.allCampaigns.map((venue, i) => {

        const RoutesService = new google.maps.DirectionsService();
        RoutesService.route({
          origin: this.state.userMarker.position,
          destination: {lat: parseFloat(venue.lat), lng: parseFloat(venue.lng)},
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
    let footerStyle = {}
    if(this.state.screenWidth > 700){
      footerStyle = {
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
    }
    else{
      footerStyle = {}
    }
    let slideComponentStyle = {}
    if(this.state.screenWidth > 700){
      if(this.state.slider != "closed"){
        this.setState({slider: 'closed'})
      }
      if(this.state.slider == "closed"){
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: "100vh",
          backgroundColor: "white",
          borderTop: "1px solid #CCCCCC",
          width: "40vw",
          left: '60vw',
          top: "0"
        }
      }
    }
    else{
      if(this.state.slider == "closed"){
        slideComponentStyle = {
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
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: "100vh",
          backgroundColor: "white",
          width: "100vw",
          top: "0px"
        }
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
    let mapComponentStyle = {}
    if(this.state.screenWidth > 700){
      mapComponentStyle = {
        float: "left", 
        width: "60%", 
        position: "fixed", 
        height: "100vh"
      }
    }
    else{
      mapComponentStyle = {
        float: "left", 
        width: "100vh", 
        position: "fixed", 
        height: "100vh"
      }
    }
    let styleObj
    if(this.state.screenWidth > 700){
      styleObj = {
        input: { padding: "6px", width: "320px"},
        autocompleteContainer: { 
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }
    }
    else{
      styleObj = {
        input: { padding: "6px", width: "calc(100vw - 24px)"},
        autocompleteContainer: { 
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }      
    }
    const inputStyling = {
      position: "fixed", 
      top: "4", 
      marginLeft: "4",
    }
    const inputProps = {
      value: this.state.address,
      onChange: this.autocompleteOnChange,
      placeholder: this.context.t('Your rough location to see distance (Optional)') ,
      autoFocus: true,
    }
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div style={{position: "relative", width: "100vw", height: "100vh", overflow: "hidden"}}>
        <ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
            {page === 1 && 
              <div>
                <div style={mapComponentStyle}>
                {this.props.allCampaigns &&
                  <MapComponent 
                    zoom={10}
                    center={{ lat: 51.537452, lng: -0.497681}}
                    containerElement={<div style={{height: 100+"%"}} />}
                    mapElement={<div style={{height: 100+"%"}} />}
                    allCampaigns={this.props.allCampaigns}
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
                  {this.state.loading ? <div style={{backgroundColor: "white"}}>{this.context.t('Loading...')}</div> : null}
                  {!this.state.loading && this.state.geocodeResults ?
                        <div className='geocoding-results'>{this.state.geocodeResults}</div> :
                      null}
                  <div style={{zIndex: '999999',}}>
                    <div style={{display: 'inline-block', float: 'left'}}>
                      <select value={this.props.lang} onChange={this.onChangeLang}>
                        {this.languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={slideComponentStyle}>
                  <SlideComponent
                    nextPage={this.nextPage}
                    screenWidth={this.state.screenWidth}
                    sliderClick={this.sliderClick}
                    openIconStyle={openIconStyle}
                    userMarker={this.state.userMarker}
                   />
                </div>
              </div>
            }
            {page > 1 && 
              <TopCounter 
                finishedStep={this.state.page}
              />}
          <Row center="xs">
            <Col xs={12} sm={12} md={2} lg={8}>
              {page === 1 && this.state.screenWidth > 700 && <div style={footerStyle}>
                <RaisedButton primary={true} 
                style={styles.raisedButtonStyle}
                label={this.context.t("APPLY")}
                onClick={this.nextPage}/>
              </div>}
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
                {page === 66 &&
                  <FormFifthPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 6 &&
                  <FormSixthPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 7 &&
                  <FormSeventhPage 
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />}
                {page === 8 &&
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


JobseekerParent.contextTypes = {
  t: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return {
    allCampaigns: state.jobseeker.allCampaigns,
  };
}

export default connect(mapStateToProps, { fetchAllCampaigns, fetchCompanies })(
  connect(state => ({
    lang: state.i18nState.lang
  }))(JobseekerParent)
)

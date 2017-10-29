import React, { Component, PropTypes } from 'react'
import FormFirstPage from './forms/form_1'
import FormSecondPage from './forms/form_2'
import FormThirdPage from './forms/form_3'
import FormFourthPage from './forms/form_4'
import FormFifthPage from './forms/form_5'
import FormSixthPage from "./forms/form_6"
import FormSeventhPage from "./forms/form_7"
import FormEithPage from "./forms/form_8"
import FormNinthPage from "./forms/form_9"
import FormLastPage from "./forms/form_9_last"
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './forms/form_material_styles'
import TopCounter from "./topCounter"
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import { connect } from 'react-redux'
import { fetchAllCampaigns, fetchCompanies, saveToViewAdditionalQuestions } from '../actions'
import { Marker, GoogleMap, DirectionsRenderer } from "react-google-maps"
import MapComponent from "./mapComponent"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import JobCards from './jobCards'
import SlideComponent from './slideComponent'
import {setLanguage} from 'redux-i18n'
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


import { Field, reduxForm, formValueSelector, change } from 'redux-form'

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
      slider: "closed",
      width: '0', height: '0',
      languageSelectionModalOpen: true
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.languages = ['pl', 'en']
    this.startLanguageSelection = this.startLanguageSelection.bind(this)
    this.determineIfAdditionalQuestionsExist = this.determineIfAdditionalQuestionsExist.bind(this)
  }
  startLanguageSelection(languageChosen){
    this.props.dispatch(setLanguage(languageChosen))
    const first_time = localStorage.getItem('first_time');
    if(first_time === null){
      localStorage.setItem('first_time', true)
      this.setState({tutorialIsOpen: true})
    }
    else{
      localStorage.setItem('first_time', false)
    }
  }
  sliderClick(){
    const first_time = localStorage.getItem('first_time');
    if(this.state.tutorialIsOpen){
      this.setState({tutorialIsOpen: false})
      localStorage.setItem('first_time', false)
    }
    const { slider } = this.state
    this.setState({slider: slider == "closed" ? "open" : "closed"})
  }
  nextPage() {
    const first_time = localStorage.getItem('first_time');
    if(this.state.tutorialIsOpen){
      this.setState({tutorialIsOpen: false})
      localStorage.setItem('first_time', false)
    }
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
    this.props.dispatch(change('wizard', 'answers_to_extra_questions', []))
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    //this.refs.thingToBlur.focus()
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
  determineIfAdditionalQuestionsExist(){
    let iDsOfAllSelectedCampaigns = []
    this.props.jobs_selected.map((job)=>{
      iDsOfAllSelectedCampaigns.push(job.campaign_id)
    })
    let copyOfAllCampaigns = [...this.props.allCampaigns]
    let campaignsHeSelected = []
    if(iDsOfAllSelectedCampaigns !== []){
      iDsOfAllSelectedCampaigns.map((id)=>{
        copyOfAllCampaigns.map((campaign)=>{
          if(id == campaign.campaign_id){
            campaignsHeSelected.push(campaign)
          }
        })
      })
    }
    let arrayOfCampaignsHeChoseThatHaveAdditionalQuestions = []
    campaignsHeSelected.map((singleCampaignHeSelected)=>{
      if(singleCampaignHeSelected.map_q_camp_js_answ && singleCampaignHeSelected.map_q_camp_js_answ.length > 0){
        arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.push(singleCampaignHeSelected)
      }
    })
    let arrayOfAllAdditionalQuestions = []
    if(arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.length > 0){
      arrayOfCampaignsHeChoseThatHaveAdditionalQuestions.map((campaignWithAdditionalQuestions)=>{
        arrayOfAllAdditionalQuestions.push(campaignWithAdditionalQuestions.map_q_camp_js_answ)
      })
      this.props.saveToViewAdditionalQuestions(...arrayOfAllAdditionalQuestions)
      this.setState({
        determinedIfAdditionalQuestionsExist: true,
        additionalQuestionsToDisplay: 'exist'
      })
    }
    else{
      this.setState({
        determinedIfAdditionalQuestionsExist: true,
        additionalQuestionsToDisplay: 'none'
      })
    }

  }
  render() {
    let footerStyle = {}
    if(this.state.width > 900){
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
    if(this.state.width > 900){
      if(this.state.slider != "closed"){
        this.setState({slider: 'closed'})
      }
      if(this.state.slider == "closed"){
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: this.state.height,
          backgroundColor: "white",
          borderTop: "1px solid #CCCCCC",
          width: this.state.width / 100 * 40,
          left: this.state.width / 100 * 60,
          top: "0",
          borderLeft: '1px solid #CCCCCC',
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
          width: this.state.width,
          top: this.state.height - 51
        }
      }
      else{
        slideComponentStyle = {
          overflow: "hidden",
          position: "absolute",
          transition: "all .2s ease-in-out",
          height: this.state.height,
          backgroundColor: "white",
          width: this.state.width,
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
    if(this.state.width > 900){
      mapComponentStyle = {
        float: "left",
        width: "60%",
        position: "fixed",
        height: this.state.height - 50
      }
    }
    else{
      mapComponentStyle = {
        float: "left",
        width: this.state.width,
        position: "fixed",
        height: this.state.height - 50
      }
    }
    let placesAutocompleteStyle
    if(this.state.width > 900){
      placesAutocompleteStyle = {
        input: { padding: "6px", width: this.state.width / 100 * 50, height: '30px', fontSize: '20px', boxShadow: '5px 5px 5px #888888'},
        autocompleteContainer: {
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }
    }
    else{
      placesAutocompleteStyle = {
        input: { padding: "6px", width: "calc(100vw - 24px)", height: '30px', fontSize: '20px', boxShadow: '5px 5px 5px #888888'},
        autocompleteContainer: {
        zIndex: "99999", width: "100%"},
        autocompleteItem: { color: '#000', fontSize: "12px", padding: "3px" },
        autocompleteItemActive: { color: '#00BCD4' },
        googleLogoImage: { width: "10px"}
      }
    }
    let inputStyling = {}
    let mapLoadingCircleStyle = {}

    let tutorialOneStyle = {}
    let tutorialTwoStyle = {}

    if(this.state.width > 900){
      inputStyling = {
        position: "fixed",
        top: "60",
        marginLeft: this.state.width / 100 * 4,
      }
      mapLoadingCircleStyle = {
        paddingTop: 'calc(50% - 140px)'
      }

      tutorialOneStyle = {
        top: '135px', 
        left: '4%', 
        zIndex: 1, 
        position: 'absolute', 
        width: "40%", 
        height: "100px", 
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }

      tutorialTwoStyle = {
        bottom: '95px', 
        right: '41%', 
        zIndex: 1, 
        position: 'absolute', 
        width: "50%", 
        height: "100px", 
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
    }
    else{
      tutorialOneStyle = {
        top: '170px', 
        right: '10px', 
        zIndex: 1, 
        position: 'absolute', 
        width: "80%", 
        height: "100px", 
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
      tutorialTwoStyle = {
        bottom: '60px', 
        left: '10px', 
        zIndex: 1, 
        position: 'absolute', 
        width: "80%", 
        height: "100px", 
        border: '2px solid',
        backgroundColor: 'white',
        borderRadius: "10px"
      }
      inputStyling = {
        position: "fixed",
        top: "90",
        marginLeft: "4"
      }
      mapLoadingCircleStyle = {
        paddingTop: 'calc(50% - 40px)'
      }
    }
    const inputProps = {
      value: this.state.address,
      onChange: this.autocompleteOnChange,
      placeholder: this.context.t('Your location to see distance') ,
    }
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div style={{position: "relative", width: this.state.width - 1, 
        height: this.state.height - 1, overflow: "hidden"}}>
            {page === 1 &&
              <div>
                <Dialog
                  modal={true}
                  overlayStyle={{opacity: "0.6"}}
                  open={this.state.languageSelectionModalOpen}
                >
                  <div style={{fontSize: '30px', marginBottom: '30px'}}><b>Select your language</b></div>
                  <div style={{fontSize: '30px', marginBottom: '30px'}}><b>Wybierz swoj jezyk</b></div>
                  <FlatButton
                    label="POLSKI"
                    primary={true}
                    onClick={()=>{
                      this.setState({languageSelectionModalOpen: false})
                      this.startLanguageSelection('pl')
                    }}
                  />
                  <FlatButton
                    label="ENGLISH"
                    primary={true}
                    onClick={()=>{
                      this.setState({languageSelectionModalOpen: false})
                      this.startLanguageSelection('en')
                    }}
                  />
                </Dialog>
                {this.state.tutorialIsOpen && 
                  <div>
                    <div style={tutorialOneStyle}>TUTORIAL One</div>
                    <div style={tutorialTwoStyle}>TUTORIAL Two</div>
                  </div>
                }
                <div style={mapComponentStyle}>
                {!this.props.allCampaigns ?
                  <div style={mapLoadingCircleStyle}>
                      <CircularProgress color="black" size={80}  thickness={7}/>
                  </div>
                  :
                  <MapComponent
                    zoom={10}
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
                    styles={placesAutocompleteStyle}
                    inputProps={inputProps}
                    onEnterKeyDown={this.handleSelect}
                  />
                  {this.state.loading ? <div style={{backgroundColor: "white"}}>{this.context.t('Loading...')}</div> : null}
                  {!this.state.loading && this.state.geocodeResults ?
                        <div className='geocoding-results'>{this.state.geocodeResults}</div> :
                      null}
                  <div style={{zIndex: '9',}}>
                    <div style={{display: 'inline-block', float: 'right', zIndex: '9'}}>
                      <select value={this.props.lang} onChange={this.onChangeLang}>
                        {this.languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={slideComponentStyle}>
                  <SlideComponent
                    nextPage={this.nextPage}
                    screenWidth={this.state.width}
                    sliderClick={this.sliderClick}
                    openIconStyle={openIconStyle}
                    userMarker={this.state.userMarker}
                    width={this.state.width}
                    height={this.state.height}
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
              {page === 1 && this.state.width > 900 && <div style={footerStyle}>
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
                    width={this.state.width}
                  />}
                {page === 3 && 
                  <FormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />
                }
                {page === 4 &&
                  <FormThirdPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 5 &&
                  <FormFourthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 66 &&
                  <FormFifthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 6 &&
                  <FormSixthPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 7 &&
                  <FormSeventhPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}
                {page === 8 && 
                  <FormEithPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    width={this.state.width}
                  />}




                {this.props.jobs_selected && !this.props.jobs_selected.length == 0 && page === 9 &&

                  <div>

                    <div>
                      {!this.state.determinedIfAdditionalQuestionsExist && this.determineIfAdditionalQuestionsExist()}
                    </div>

                    <div>
                      {this.state.determinedIfAdditionalQuestionsExist && this.state.additionalQuestionsToDisplay == 'none' &&

                        <FormLastPage
                          previousPage={this.previousPage}
                          onSubmit={onSubmit}
                          width={this.state.width}
                        />

                      }

                      {this.state.determinedIfAdditionalQuestionsExist && this.state.additionalQuestionsToDisplay != 'none' &&

                        <FormNinthPage
                          previousPage={this.previousPage}
                          onSubmit={this.nextPage}
                          width={this.state.width}
                          additionalQuestionsToDisplay={this.state.additionalQuestionsToDisplay}
                        />

                      }

                    </div>

                  </div>

                }

                {this.props.jobs_selected && !this.props.jobs_selected.length == 0 && page === 10 &&
                  <FormLastPage
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                    width={this.state.width}
                  />
                }

                {this.props.jobs_selected && this.props.jobs_selected.length == 0 && page === 9 &&
                  <FormLastPage
                    previousPage={this.previousPage}
                    onSubmit={onSubmit}
                    width={this.state.width}
                  />
                }
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



const selector2 = formValueSelector('wizard')
JobseekerParent = connect(
  state => {
    const jobs_selected = selector2(state, 'jobs_selected')
    return {
      jobs_selected
    }
  }
)(JobseekerParent)



function mapStateToProps(state) {
  return {
    allCampaigns: state.jobseeker.allCampaigns
  };
}

export default connect(mapStateToProps, { fetchAllCampaigns, fetchCompanies, saveToViewAdditionalQuestions })(
  connect(state => ({
    lang: state.i18nState.lang
  }))(JobseekerParent)
)

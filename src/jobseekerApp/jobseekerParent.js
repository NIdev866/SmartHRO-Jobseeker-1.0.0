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
import JobCards from "./jobCards"
import MapPageWrapper from "./forms/mapPageWrapper"

config()
class JobseekerParent extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.updateUserMarker = this.updateUserMarker.bind(this)
    this.state = {
      slide: "toLeft",
      page: 1,
      userMarker: {
        position: {
          lat: 0,
          lng: 0
        }
      }
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
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <Grid className='form-container'>
        <Row center="xs">
          <Col xs={13} sm={12} md={2} lg={8}>
            {page === 1 && 
              <div style={{marginBottom: "20px"}}>
                <h2>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h2>
                <h3>Select maximum 3 job boxes to apply for them.<br/>
                    Click on the job to read more about it</h3>
                <JobCards 
                  allCampaigns={this.props.allCampaigns}
                />
              </div>
            }
            {page > 1 && 
              <TopCounter 
                finishedStep={this.state.page}
              />}
          </Col>
        </Row>
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
      </Grid>
    )
  }
}

JobseekerParent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


export default JobseekerParent
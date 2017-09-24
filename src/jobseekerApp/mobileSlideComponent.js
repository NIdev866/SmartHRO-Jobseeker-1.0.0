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
import MapPageWrapper from "./forms/mapPageWrapper"



import TEMPORARYmobileJobCards from "./TEMPORARYmobileJobCards"


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
      position: "absolute",
      left: "0",
      bottom: "0",
      paddingBottom: "2px",
      width: "100%",
      borderTop: "1px solid",
      borderColor: "#DCDCDC",
      backgroundColor: "white",
      zIndex: "8000",
      overflow: "hidden",
      height: "60px"
    }
    const { onSubmit } = this.props
    const { page } = this.state
    return (

      <div style={{position: "relative"}}>

        <div onClick={this.props.sliderClick} style={{borderBottom: "1px solid #CCCCCC", position: "relative", width: "400px", margin: "0 auto"}}>
          <div style={{color: "grey", lineHeight: "50px", position: "absolute", width: "80px",left: "120px"}}>
            <b>ALL JOBS</b>
          </div>
          <div style={this.props.openIconStyle}>


            <div>

              <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "5px", marginTop: "5px", width: "40px", height: "40px"}} width="48" height="48" viewBox="0 0 58 58"><path d="M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z"/></svg>
         
            </div>


          </div>
        </div>
        <div style={{margin: "10px", marginTop: "0px", height: "calc(100vh - 50px)", overflow: "scroll"}}>
          <h2>PLEASE APPLY FOR THIS JOB BY REGISTERING WITH US.</h2>
          <h3>Select maximum 3 job boxes to apply for them.<br/>
              Click on the job to read more about it</h3>
          <TEMPORARYmobileJobCards />
        </div>

        <div style={footerStyle}>
          <RaisedButton primary={true} 
          style={{...styles.raisedButtonStyle, marginTop: "10px"}}
          label="APPLY"/>
        </div>
      </div>
    )
  }
}

JobseekerParent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


export default JobseekerParent
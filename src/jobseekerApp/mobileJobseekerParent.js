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


import MobileSlideComponent from "./mobileSlideComponent"
import MapComponent from "./mapComponent"

config()





class JobseekerParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider: "closed"
    }
    this.sliderClick = this.sliderClick.bind(this)
  }
  sliderClick(){
    const { slider } = this.state
    this.setState({slider: slider == "closed" ? "open" : "closed"})
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



    return (
        <div style={{position: "relative", width: "100vw", height: "100vh"}}>

          <div style={{position: "absolute", height: "calc(100vh - 50px)", width: "100vw"}}>

            <MapComponent 
                    zoom={10}
                    center={{ lat: 51.537452, lng: -0.497681}}
                    containerElement={<div style={{height: 100+"%"}} />}
                    mapElement={<div style={{height: 100+"%"}} />}
                  />

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
export default JobseekerParent
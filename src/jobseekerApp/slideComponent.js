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

import {setLanguage} from 'redux-i18n'
import {connect} from 'react-redux'


config()

class SlideElement extends Component {
 render() {
   const footerStyle = {
     backgroundColor: 'white',
     position: "absolute",
     left: "0",
     bottom: "0",
     paddingBottom: "2px",
     width: "100%",
     borderTop: "1px solid",
     borderColor: "#DCDCDC ",
     zIndex: "8000",
     overflow: "hidden",
     height: "60px"
   }
   return (
     <div style={{position: "relative"}}>
       {this.props.screenWidth <= 700 &&
         <div onClick={this.props.sliderClick} style={{height: '50px', borderBottom: "1px solid #CCCCCC "}}>
           <div style={{position: "relative", width: "400px", margin: "0 auto"}}>
             <div style={{color: "grey", lineHeight: "50px", position: "absolute", width: "80px",left: "120px"}}>
               <b>{this.context.t('ALL JOBS')}</b>
             </div>
             <div style={this.props.openIconStyle}>
               <div>
                 <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "5px", marginTop: "5px", width: "40px", height: "40px"}} width="48" height="48" viewBox="0 0 58 58"><path d="M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z"/></svg>
               </div>
             </div>
           </div>
         </div>
       }
       <div style={{margin: "10px", marginTop: "0px", height: "calc(100vh - 50px)", overflow: "scroll"}}>
         <h2>{this.context.t('PLEASE APPLY FOR JOBS BY REGISTERING WITH US.')}</h2>
         <h3>{this.context.t('Select maximum 3 job boxes to apply for them.')}<br/>
             {this.context.t('Click on the job to read more about it.')}</h3>
         <div style={{width: '100%', height: '450px'}}>
           <JobCards userMarker={this.props.userMarker} screenWidth={this.props.screenWidth}/>
         </div>
       </div>

       {this.props.screenWidth <= 700 &&
         <div style={footerStyle}>
           <RaisedButton primary={true}
           onClick={this.props.nextPage}
           style={{...styles.raisedButtonStyle, marginTop: "10px"}}
           label={this.context.t("APPLY")} />
         </div>
       }
     </div>
   )
 }
}


SlideElement.contextTypes = {
 t: PropTypes.func.isRequired
}

export default connect(state => ({
   lang: state.i18nState.lang
 }))(SlideElement)

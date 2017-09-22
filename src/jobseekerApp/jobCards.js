import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Checkbox } from "material-ui"
import jobs from "../jobs.json"
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from "react-redux"
import { getFormValues } from 'redux-form'
import { fetchAllCampaigns } from '../actions'

class CheckboxComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      checked: false
    }
    this.seeIfDisabled = this.seeIfDisabled.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
    this.props.fields.remove(0)
  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      }
    }, ()=>{
      if(this.state.checked){
        this.props.countBoxesTicked(true)
        this.props.fields.push(this.props.jobSelected)
      }
      else if(!this.state.checked){
        this.props.countBoxesTicked(false)
        this.props.jobsSelectedValues.map((singleField, index)=>{
          if(this.props.jobSelected === singleField){
            this.props.fields.remove(index)
          }
        })
      }
    })
  }
  seeIfDisabled(){
    if(this.props.boxesTicked < 3){
      return false
    }
    else if(this.props.boxesTicked >= 3 && !this.state.checked){
      return true
    }
  }
  render(){
    return(
      <div>
        <Checkbox 
          disableTouchRipple
          disabled={this.seeIfDisabled()}
          onCheck={this.updateCheck.bind(this)}
        />
      </div>
    )
  }
}

CheckboxComponent = connect(
  state => {
    if(state.form.wizard.values){
      return{
        jobsSelectedValues: state.form.wizard.values.jobsSelected,
      }
    }
  }
)(CheckboxComponent)

class CardExampleExpandable extends Component{
  constructor(props){
    super(props)
    this.state = {
      boxesTicked: 0,
    }
    this.countBoxesTicked = this.countBoxesTicked.bind(this)
  }
  countBoxesTicked(value){
    if(value){
      this.setState({boxesTicked: this.state.boxesTicked+1})
    }
    else{
      this.setState({boxesTicked: this.state.boxesTicked-1})
    }
  }
  componentWillMount(){
    this.props.fetchAllCampaigns()
  }
  render(){    
    if(this.props.allCampaigns){
      console.log({allCampaigns: this.props.allCampaigns})
    }
    const tickButtonStyle = {
      position: "Absolute",
      marginLeft: "-10px"
    }
    const cardStyle = {
      marginTop: "20px",
    }
    return(
      <div>
        {this.props.allCampaigns && this.props.allCampaigns.map((campaign) => {
          console.log(campaign)
          let campaign_name = campaign.campaign_name
          if(campaign_name.length > 20){
            campaign_name = campaign_name.substring(0, 20) + "..."
          }
          return(
            <div>
            <div style={tickButtonStyle}>
              <FieldArray 
                name="jobsSelected" 
                component={CheckboxComponent}
                jobSelected={campaign.id}
                countBoxesTicked={this.countBoxesTicked}
                boxesTicked={this.state.boxesTicked}
              />
            </div>
            <Card style={cardStyle}>
              <CardHeader
                title={campaign_name}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{paddingBottom: "1px", paddingTop: "1px"}}>
              <div style={{borderTop: "1px solid #DCDCDC", paddingTop: "10px"}}>
                <div style={{maxWidth: "500px", margin: "0 auto", textAlign: "left"}}>
                  <div>Campaign name:</div>
                  <div>{campaign.campaign_name}</div>
                  <br />
                  <div>Sector:</div>
                  <div>{campaign.sector}</div>
                  <br />
                  <div>Position:</div>
                  <div>{campaign.position}</div>
                  <br />
                  <div>campaign Description:</div>
                  <div>{campaign.description}</div>
                  <br />
                  <div>Terms:</div>
                  <div>{campaign.terms}</div>
                  <br />
                  <div>Work Postcode:</div>
                  <div>{campaign.work_postalcode}</div>
                  <br />
                  <div>Salary:</div>
                  <div>{campaign.salary}</div>
                  <br />
                  <div>Start Date:</div>
                  <div>{campaign.start_date}</div>
                </div>
              </div>
            </CardText>
          </Card>
          </div>
        )
        })}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    allCampaigns: state.jobseeker.allCampaigns,
  };
}

export default reduxForm({
  form: 'wizard',  // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(
  connect(mapStateToProps, { fetchAllCampaigns })(CardExampleExpandable)
)
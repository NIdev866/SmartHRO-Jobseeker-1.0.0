import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Checkbox } from "material-ui"
import jobs from "../jobs.json"
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from "react-redux"
import { getFormValues } from 'redux-form'
import { fetchCompanies, fetchAllCampaigns } from '../actions'

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
    this.currentCompanyNameFromcompany_id = this.currentCompanyNameFromcompany_id.bind(this)
    this.currentCampaignSalaryType = this.currentCampaignSalaryType.bind(this)
  }
  countBoxesTicked(value){
    if(value){
      this.setState({boxesTicked: this.state.boxesTicked+1})
    }
    else{
      this.setState({boxesTicked: this.state.boxesTicked-1})
    }
  }




  currentCompanyNameFromcompany_id(company_id){

    //console.log({currentCompanyNameFromcompany_id: this.props.companies.filter(el=>el.company_id === company_id)[0].company_name})

    return this.props.companies.filter(el=>el.company_id === company_id)[0].company_name
  }


  currentCampaignSalaryType(salary_type, salary){
    switch(salary_type){
      case "PER_ANNUM":
        return `£ ${salary} per annum`
      case "PER_WEEK":
        return `£ ${salary} per week`
      case "PER_DAY":
        return `£ ${salary} per day`
      case "PER_HOUR":
        return `£ ${salary} per hour`
      default:
        return "error in salary_type OR salary"
    }
  }


  componentWillMount(){
    this.props.fetchCompanies()
    this.props.fetchAllCampaigns()
  }
  render(){

    const tickButtonStyle = {
      float: "right"
    }
    const cardStyle = {
      marginTop: "20px",
    }



    let correctCompanyStateForMapping = []

    if(this.props.companiesWithDurations){
      correctCompanyStateForMapping = this.props.companiesWithDurations
    }
    else{
      correctCompanyStateForMapping = this.props.companies
    }


    return(
      <div>
        {this.props.allCampaigns && correctCompanyStateForMapping && this.props.allCampaigns.map((campaign) => {
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
                style={{height: "160px", textAlign: "left"}}
                actAsExpander={true}
                showExpandableButton={true}
                iconStyle={{position: "relative", left: "12px"}}
              >
                <p style={{fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name}</b></p>
                <p style={{fontSize: "17px", margin: "-10px", marginTop: "10px", padding: "0"}}>{this.currentCompanyNameFromcompany_id(campaign.company_id)}</p>
                <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.location ? campaign.location : "location"}</p>
                <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.job_type ? campaign.job_type : "job type"}</p>
                <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.salary_type ? this.currentCampaignSalaryType(campaign.salary_type, campaign.salary) : "£ ... 'per month'etc"}</p>
                <p style={{fontSize: "15px", margin: "-10px", marginTop: "10px", padding: "0", color: "grey"}}>{campaign.job_start_date ? `Starting on ${campaign.job_start_date}` : "Starting on 13/07/2017"}</p>
              
                <p style={{fontSize: "15px", margin: "-10px", marginTop: "26px", padding: "0", color: "grey"}}>Distance: {this.props.companiesWithDurations ? this.props.companiesWithDurations.filter(el=>el.company_id === campaign.company_id)[0].duration + " away" : "  ___________"}</p>
              </CardHeader>






              <CardText expandable={true} style={{paddingBottom: "1px", paddingTop: "1px"}}>
              <div style={{borderTop: "1px solid #DCDCDC", paddingTop: "10px"}}>
                <div style={{maxWidth: "500px", margin: "0 auto", textAlign: "left"}}>
                  <div>job description <br /> job description <br /> job description <br /> job description <br /> job description <br /> job description <br /> </div>
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
    companies: state.jobseeker.companies,
    companiesWithDurations: state.jobseeker.companiesWithDurations,
    allCampaigns: state.jobseeker.allCampaigns,
  };
}

export default reduxForm({
  form: 'wizard',  // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(
  connect(mapStateToProps, { fetchCompanies, fetchAllCampaigns })(CardExampleExpandable)
)
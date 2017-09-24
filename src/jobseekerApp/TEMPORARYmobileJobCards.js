import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Checkbox } from "material-ui"
import jobs from "../jobs.json"
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from "react-redux"
import { getFormValues } from 'redux-form'
import { fetchCompanies, fetchAllCampaigns } from '../actions'



class CardExampleExpandable extends Component{
  render(){
    const cardStyle = {
      marginTop: "20px",
    }
    let testt = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", ]
    return(
      <div>
        {testt.map((campaign) => {
          return(
            <Card style={cardStyle}>
              <CardHeader
                style={{height: "120px", textAlign: "left"}}
                actAsExpander={true}
                showExpandableButton={true}
                iconStyle={{position: "relative", left: "12px"}}
              >
              </CardHeader>
           </Card>
          )
        })}
      </div>
    )
  }
}



export default CardExampleExpandable
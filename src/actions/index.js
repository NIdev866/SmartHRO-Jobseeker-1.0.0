import React from 'react';
import axios from 'axios';

import { 
  ALL_CAMPAIGNS
} from './types.js';



const ROOT_URL = 'http://localhost:3000';



export function fetchAllCampaigns(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/campaigns/all`)
      .then(response => {
        dispatch({ type: ALL_CAMPAIGNS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}





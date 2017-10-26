import { 
  ALL_CAMPAIGNS,
  COMPANIES,
  CREATE_CAMPAIGN_SUBMITTING_STARTED,
  CREATE_CAMPAIGN_SUBMITTING_SUCCESSFUL,
  CREATE_CAMPAIGN_SUBMITTING_FAILED
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }


    case CREATE_CAMPAIGN_SUBMITTING_STARTED:
      return {...state, createCampaignSubmittingStarted: true, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: false}

    case CREATE_CAMPAIGN_SUBMITTING_SUCCESSFUL:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: true, createCampaignSubmittingFailed: false}

    case CREATE_CAMPAIGN_SUBMITTING_FAILED:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: true}


    default:
      return state;
  }
}

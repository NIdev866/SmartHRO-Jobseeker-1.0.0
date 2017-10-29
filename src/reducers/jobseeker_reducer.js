import { 
  ALL_CAMPAIGNS,
  COMPANIES,
  JOBSEEKER_APPLICATION_SUBMITTING_STARTED,
  JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL,
  JOBSEEKER_APPLICATION_SUBMITTING_FAILED,

  SAVE_TO_VIEW_ADDITIONAL_QUESTIONS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }


    case JOBSEEKER_APPLICATION_SUBMITTING_STARTED:
      return {...state, createCampaignSubmittingStarted: true, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: false}

    case JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: true, createCampaignSubmittingFailed: false}

    case JOBSEEKER_APPLICATION_SUBMITTING_FAILED:
      return {...state, createCampaignSubmittingStarted: false, createCampaignSubmittingSuccessful: false, createCampaignSubmittingFailed: true}

    case SAVE_TO_VIEW_ADDITIONAL_QUESTIONS:
      return {...state, additionalQuestionsState: action.payload}

    default:
      return state;
  }
}

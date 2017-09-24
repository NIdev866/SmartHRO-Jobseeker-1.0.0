import { 
  ALL_CAMPAIGNS,
  COMPANIES,
  ADD_DURATION_TO_COMPANIES
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }
    case ADD_DURATION_TO_COMPANIES:
      return { ...state, companiesWithDurations: action.payload}
    default:
      return state;
  }
}

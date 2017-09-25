import { 
  ALL_CAMPAIGNS,
  COMPANIES
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }
    default:
      return state;
  }
}

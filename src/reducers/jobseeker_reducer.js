import { 
  ALL_CAMPAIGNS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_CAMPAIGNS:
      return { ...state, allCampaigns: action.payload }
    default:
      return state;
  }
}

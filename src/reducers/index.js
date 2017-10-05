import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jobseekerReducer from './jobseeker_reducer'
import {i18nState} from "redux-i18n"

const rootReducer = combineReducers({
  form: formReducer,
  jobseeker: jobseekerReducer,
  i18nState
});

export default rootReducer;

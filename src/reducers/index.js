import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import jobseekerReducer from './jobseeker_reducer'


const rootReducer = combineReducers({
  form: formReducer,
  jobseeker: jobseekerReducer,
});

export default rootReducer;

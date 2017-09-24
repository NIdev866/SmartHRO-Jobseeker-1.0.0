import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import DesktopJobseekerParent from './jobseekerApp/desktopJobseekerParent';
import MobileJobseekerParent from './jobseekerApp/mobileJobseekerParent';
import injectTapEventPlugin from 'react-tap-event-plugin'
import reduxThunk from 'redux-thunk';



var deviceDetect = require('device-detect')();




injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Route path="/" component={
            deviceDetect.device == "Windows" || 
            deviceDetect.device == "Macintosh" ||
            deviceDetect.device == "Linux" ? /*DesktopJobseekerParent*/MobileJobseekerParent : MobileJobseekerParent} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
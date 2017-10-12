import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import { BrowserRouter, Route , Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin'
import reduxThunk from 'redux-thunk';

import JobseekerParent from "./jobseekerApp/jobseekerParent"

import I18n from "redux-i18n"

import {translations} from "./translations"



injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(reduxThunk, promise)
  ));

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations}>
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route path="/" component={JobseekerParent} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </I18n>
  </Provider>
  , document.getElementById('root'));

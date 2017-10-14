import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {submit} from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'


class RemoteSubmitButton extends Component {
	render(){
		return(
		  <RaisedButton
		    type="button"
		    label={this.context.t("Submit")}
		    primary={true}
		    onClick={() => this.props.dispatch(submit('wizard'))}
		  />
		)
	}
}
//                                  ^^^^^^^^^^^^ name of the form

RemoteSubmitButton.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect()(RemoteSubmitButton)
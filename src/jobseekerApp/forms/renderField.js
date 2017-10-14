import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import {blue500, grey400} from 'material-ui/styles/colors'
import Animation from 'react-addons-css-transition-group'

const styles = {
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  }
};

class renderField extends Component{
  render(){
  return(
      <div>
        <TextField
          floatingLabelText={this.props.label}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          fullWidth={true}
          primary={true}
          {...this.props.input}
        />
        <div style={{color: "red"}}>
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Required" ? <span>{this.context.t('Required')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Input too long" ? <span>{this.context.t('Input too long')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Invalid name - must not contain numbers" ? <span>{this.context.t('Invalid name - must not contain numbers')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "One valid number required" ? <span>{this.context.t('One valid number required')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Invalid number" ? <span>{this.context.t('Invalid number')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Invalid email address" ? <span>{this.context.t('Invalid email address')}</span> : ""}
          {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error == "Emails don't match" ? <span>{this.context.t("Emails don't match")}</span> : ""}
        </div>
      </div>
  )
  }
}

renderField.contextTypes = {
  t: PropTypes.func.isRequired
}

export default renderField


















/*import React from 'react'
import TextField from 'material-ui/TextField'
import {blue500, grey400} from 'material-ui/styles/colors'
import Animation from 'react-addons-css-transition-group'

const styles = {
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  }
};

const renderField = ({ input, label, type, meta: { dirty, touched, error } }) => {
  return(
    <Animation
    transitionName='fade'
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    transitionAppear={true}
    transitionAppearTimeout={500}
    >
      <div>
        <TextField
          floatingLabelText={label}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          fullWidth={true}
          primary={true}
          {...input}
        />
        <div style={{color: "red"}}>
          {(dirty || touched) ? <span>{error}</span> : ""}
        </div>
      </div>
    </Animation>
  )
}

export default renderField     BACKUPPPPPP
*/
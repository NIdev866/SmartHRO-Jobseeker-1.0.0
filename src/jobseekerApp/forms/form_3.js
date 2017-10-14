import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

class FormThirdPage extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto'}} zDepth={2} rounded={false}>
            <Row center="xs" style={{height: 360,  width: '80%', margin: '0 auto'}}>
              <Col xs={10} sm={10} md={3} lg={5}>
                <Field
                  name="contact_no"
                  type="text"
                  component={renderField}
                  label={this.context.t("Mobile Number")}
                />
                <Field
                  name="landline_no"
                  type="text"
                  component={renderField}
                  label={this.context.t("Landline Number")}
                />
              </Col>
            </Row>
            <Row center="xs">
              <RaisedButton
                type="button"
                label={this.context.t('Prev')}
                primary={true}
                onClick={previousPage}
                style={styles.raisedButtonStyle}
              />
              <RaisedButton
                type="submit"
                label={this.context.t('Next')}
                primary={true}
                style={styles.raisedButtonStyle}
              />
            </Row>
          </Paper>
          :
          <div>
            <Row center="xs" style={{height: 360}}>
              <Col xs={10} sm={10} md={3} lg={5}>
                <Field
                  name="contact_no"
                  type="text"
                  component={renderField}
                  label={this.context.t("Mobile Number")}
                />
                <Field
                  name="landline_no"
                  type="text"
                  component={renderField}
                  label={this.context.t("Landline Number")}
                />
              </Col>
            </Row>
            <Row center="xs">
              <RaisedButton
                type="button"
                label={this.context.t('Prev')}
                primary={true}
                onClick={previousPage}
                style={styles.raisedButtonStyle}
              />
              <RaisedButton
                type="submit"
                label={this.context.t('Next')}
                primary={true}
                style={styles.raisedButtonStyle}
              />
            </Row>
          </div>
        }
      </form>
    )
  }
}

FormThirdPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(
  connect(state => ({
    lang: state.i18nState.lang
  }))(FormThirdPage)
)


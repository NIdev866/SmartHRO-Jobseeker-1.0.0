import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import Paper from 'material-ui/Paper';

class FormFourthPage extends Component{
  render(){
    const { handleSubmit, previousPage } = this.props
    return(
      <form onSubmit={handleSubmit}>
        {this.props.width > 700 ?
          <Paper style={{maxWidth: '700px', margin: '0 auto'}} zDepth={2} rounded={false}>
            <Row style={{height: 360, width: '80%', margin: '0 auto'}}>
              <Row center="xs">
                <Col xs={10} sm={6} md={3} lg={5}>
                  <Field name="email_id" type="email" component={renderField} label="Email" />
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={10} sm={6} md={3} lg={5}>
                  <Field name="emailCopy" type="emailCopy" component={renderField} label={this.context.t("Repeat Email")} />
                </Col>
              </Row>
            </Row>
            <Row center="xs">
              <Col xs={12} sm={6} md={3} lg={5}>
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
              </Col>
            </Row>
          </Paper>
          :
          <div>
            <Row style={{height: 360}}>
              <Row center="xs">
                <Col xs={10} sm={6} md={3} lg={5}>
                  <Field name="email_id" type="email" component={renderField} label="Email" />
                </Col>
              </Row>
              <Row center="xs">
                <Col xs={10} sm={6} md={3} lg={5}>
                  <Field name="emailCopy" type="emailCopy" component={renderField} label={this.context.t("Repeat Email")} />
                </Col>
              </Row>
            </Row>
            <Row center="xs">
              <Col xs={12} sm={6} md={3} lg={5}>
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
              </Col>
            </Row>
          </div>
        }
      </form>
    )
  }
}

FormFourthPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFourthPage)

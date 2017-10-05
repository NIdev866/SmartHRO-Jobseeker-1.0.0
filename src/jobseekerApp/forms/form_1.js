import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { first_name, last_name } from './formValues'

class FormFirstPage extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
          <Row center="xs" style={{height: 360}}>
            <Col xs={10} sm={10} md={3} lg={5}>
                <Field
                  name={first_name}
                  type="text"
                  component={renderField}
                  label={this.context.t('First Name')}
                />
                <Field
                  name={last_name}
                  type="text"
                  component={renderField}
                  label={this.context.t('Last Name')}
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
      </form>
    )
  }
}

FormFirstPage.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)


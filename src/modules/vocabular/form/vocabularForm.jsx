import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row } from 'reactstrap';
import _ from 'lodash';
import VocabularTree from './vocabularTree';
import VocabularTermForm from './vocabularTermForm';
import { required } from '../../utils/form/validators';
import { TextField } from '../../utils/form/form';
import {
  vocabularClearForm,
  vocabularCreate,
  vocabularGetById,
  vocabularUpdate,
} from '../_actions/vocabularActions';

class VocabularForm extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    const vocabularId = this.props.match.params.id;

    if (vocabularId) {
      this.props.vocabularGetById(vocabularId);
    } else {
      this.props.vocabularClearForm();
    }
  }

  formSubmit(e) {
    e.preventDefault();

    const vocabularId = this.props.match.params.id;
    const data = {
      name: this.props.vocabularForm.values.name,
      terms: this.props.vocabularTree,
    };

    if (vocabularId) {
      this.props.vocabularUpdate(vocabularId, data);
    } else {
      this.props.vocabularCreate(data);
    }
  }

  render() {
    return (
      <Row>
        <Col md="12">
          <h1>Vocabular {_.has(this.props, 'vocabularForm.values.name')
            ? this.props.vocabularForm.values.name
            : null}
          </h1>

          <Form onSubmit={this.formSubmit}>
            <Field
              name="name"
              type="text"
              placeholder="Vocabular name"
              component={TextField}
              validate={[required]}
            />

            <Button
              type="submit"
              color="primary"
              disabled={this.props.vocabularForm && {}.hasOwnProperty.call(this.props.vocabularForm, 'syncErrors')}
            >Save
            </Button>
          </Form>
        </Col>

        <Col md="6">
          <VocabularTree />
        </Col>

        <Col md="6">
          <VocabularTermForm />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  vocabularForm: state.form.vocabular,
  vocabularTree: state.vocabular.vocabularTree,
});

const mapDispatchToProps = dispatch => ({
  vocabularGetById: vocabularId => dispatch(vocabularGetById(vocabularId)),
  vocabularCreate: data => dispatch(vocabularCreate(data)),
  vocabularUpdate: (vocabularId, data) => dispatch(vocabularUpdate(vocabularId, data)),
  vocabularClearForm: () => dispatch(vocabularClearForm()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'vocabular' }),
)(VocabularForm);

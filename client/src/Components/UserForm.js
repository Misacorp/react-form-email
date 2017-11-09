import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

class UserForm extends Component {
  render() {
    const translations = this.props.translations;

    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
            <FieldGroup
              id="name"
              type="text"
              label={ translations.name.name }
              placeholder={ translations.name.placeholder }
              value={ this.props.userData.name }
              onChange={ (e) => { this.props.handleChange(e) }}
            />

            <FieldGroup
              id="phone"
              type="phone"
              label={ translations.phone.name }
              placeholder={ translations.phone.placeholder }
              value={ this.props.userData.phone }
              onChange={ (e) => { this.props.handleChange(e) }}
            />
          </Col>

          <Col xs={12} md={6}>
            <FieldGroup
              id="email"
              type="email"
              label={ translations.email.name }
              placeholder={ translations.email.placeholder }
              value={ this.props.userData.email }
              onChange={ (e) => { this.props.handleChange(e) }}
            />

            <FieldGroup
              id="country"
              type="text"
              label={ translations.country.name }
              placeholder={ translations.country.placeholder }
              value={ this.props.userData.country }
              onChange={ (e) => { this.props.handleChange(e) }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserForm;
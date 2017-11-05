import React, { Component } from 'react';
import FieldGroup from './FieldGroup';
import { Button } from 'react-bootstrap';

class BuyInForm extends Component {
  constructor(props) {
    super(props);
    // Gather all input ids on the form into an object. Set their value to empty.

    // Set default state
    this.state = {
      brand: '',
      model: ''
    }

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // Handle changing of input values for a given property
  handleChangeFor = (propertyName) => (event) => {
    const { currentState } = this.state;
    // Create an updated version of this state
    const newState = {
      // Everything already in state
      ...currentState,
      // Changed property
      [propertyName]: event.target.value
    };
    // Replace state with updated one
    this.setState(newState);
  }


  handleSubmit(e) {
    e.preventDefault();

    // Construct object that is to be submitted
    const formData = this.state;
    // Add language to form data
    formData.language = this.props.translations.language;
    console.log(formData);
  }


  render() {
    const translations = this.props.translations;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="brand"
            type="text"
            label={translations.brand.name}
            placeholder={translations.brand.placeholder}
            help={translations.brand.help}
            value={this.state.brand}
            onChange={this.handleChangeFor('brand')}
          />

          <FieldGroup
            id="model"
            type="text"
            label={translations.model.name}
            placeholder={translations.model.placeholder}
            help={translations.model.help}
            value={this.state.model}
            onChange={this.handleChangeFor('model')}
          />

          <Button type="submit" bsSize="large" bsStyle="primary">Submit</Button>
        </form>
      </div>
    );
  }
}

export default BuyInForm;
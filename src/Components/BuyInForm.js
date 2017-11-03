import React, { Component } from 'react';
import FieldGroup from './FieldGroup';

class BuyInForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translations = this.props.translations;

    return (
      <div>
        <form>
          <FieldGroup
            id="brand"
            type="text"
            label={translations.brand}
            placeholder="Enter the brand name"
            help="Help me please"
          />
        </form>
      </div>
    );
  }
}

export default BuyInForm;
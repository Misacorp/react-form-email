import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class FieldGroup extends Component {
  render() {
    return (
      <div>
        <FormGroup controlId={this.props.id}>
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl {...this.props} />
          {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        </FormGroup>
      </div>
    );
  }
}

export default FieldGroup;
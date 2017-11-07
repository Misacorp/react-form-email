import React, { Component } from 'react';
import FieldGroup from './FieldGroup';
import { Button } from 'react-bootstrap';
import { Email, Box, Item, renderEmail } from 'react-html-email'
import FileBase64 from 'react-file-base64';
import FetchError from 'fetch-error';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    // Gather all input ids on the form into an object. Set their value to empty.

    // Set default state
    this.state = {
      brand: '',
      model: '',
      files: []
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


  getFiles(files) {
    this.setState({
      files: files
    })
  }


  handleSubmit(e) {
    e.preventDefault();

    // Construct object that is to be submitted
    const formData = this.state;
    // Add language to form data
    formData.language = this.props.translations.language;
    console.log(formData);

    // Create and send email
    const email = {
      html: this.buildEmail(),
      attachments: this.state.files
    }

    this.sendMail(email);
  }



  buildEmail() {
    const emailHTML = renderEmail(
      <Email title="Hello World!">
        <Box>
          <Item>Language: {this.props.translations.language}</Item>
          <Item>Brand: {this.state.brand}</Item>
          <Item>Model: {this.state.model}</Item>
        </Box>
      </Email>
    );

    return emailHTML;
  }


  // Send form data to back end form handler.
  sendMail(data) {
    // Send email to backend
    fetch('/mail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(this.errorify)
    .then((response) => {
      if(response) {
        response.json();
      }
      else {
        return {
          status: "error"
        }
      }
    })
    .then((j) => {
      console.log(j);
    });
  }



  errorify(res) {
    if (res.status >= 400 && res.status < 600)
      throw new FetchError(res.status, res.statusText, {response: res})
    else
      return res
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

          <FileBase64
            multiple={ true }
            onDone={ this.getFiles.bind(this) }
          />

          <Button type="submit" bsSize="large" bsStyle="primary">Submit</Button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
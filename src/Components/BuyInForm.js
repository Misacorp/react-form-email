import React, { Component } from 'react';
import FieldGroup from './FieldGroup';
import { Button } from 'react-bootstrap';
import { Image, Email, Box, Item, Span, A, renderEmail } from 'react-html-email'
import FileBase64 from 'react-file-base64';

class BuyInForm extends Component {
  constructor(props) {
    super(props);
    // Gather all input ids on the form into an object. Set their value to empty.

    // Set default state
    this.state = {
      brand: '',
      model: '',
      images: [],
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


  handleFileSelect(e) {
    // Image that was submitted
    const selectedFile = e.target.files;
    // Get images from state
    const newImages = this.state.images;
    newImages.push(selectedFile);
    // Get current state
    const { currentState } = this.state;
    // Update image array
    const newState = {
      images: newImages,
      ...currentState
    }
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
    this.buildEmail();
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

    this.sendMail(emailHTML, this.state.files);
  }


  // Send form data to back end form handler.
  sendMail(data, attachments) {
    // Base64 encode attachments
    // console.log("Encoding attachments to Base64");
    // for(let i = 0; i < attachments.length; i++) {
    //   let currentFile = attachments[i]
    //   console.log(currentFile);
    //   console.log(imageAsBase64);
    // }

    // Send email to backend
    fetch('/mail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: data,
        attachments: attachments
      })
    }).then((response) => {
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    });
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

          <FieldGroup          
            id="formControlsFile"
            type="file"
            label={translations.image.name}
            help={translations.image.help}
            onChange={this.handleFileSelect.bind(this)}
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

export default BuyInForm;
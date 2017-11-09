import React, { Component } from 'react';
import { Col, Row, Button, Panel } from 'react-bootstrap';
import './App.css';
import Product from './Components/Product';
import ProductFormContainer from './Components/ProductFormContainer';
import Mailer from './Components/Mailer';
import UserForm from './Components/UserForm';

// Translations
import en from './translations/en.json';
import fr from './translations/fr.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      //  Define translation object
      translations: en,
      products: [
        new Product(),
      ],
      userData: {
        name: '',
        phone: '',
        email: '',
        country: ''
      },
      status: 'ready'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  // Resets form state
  resetForm() {
    this.setState({
      products: [
        new Product(),
      ],
      userData: {
        name: '',
        phone: '',
        email: '',
        country: ''
      }
    });

    // After 5 seconds, reset form submission result message
    setTimeout(function() { this.setState({...this.state, status: 'ready'}); }.bind(this), 5000);
  }


  changeLanguage(lang) {
    this.setState({ translations: lang });
  }


  // Handles input value changes. @index is the product's index in this.state.products
  handleProductChange(index, event) {
    // Updated product item
    const newProduct = this.state.products[index];
    newProduct.setProperty(event.target.id, event.target.value);

    // Update state with new product
    this.updateProduct(index, newProduct);
  }


  // Handles radio button changes
  handleOptionChange(index, event) {
    const newProduct = this.state.products[index];
    newProduct.condition = event.target.value;

    // Update state with new product
    this.updateProduct(index, newProduct);
  }


  // Replaces the this.state.product[index] with @item
  updateProduct(index, item) {
    // Add item to a copy of the current state
    const products = this.state.products;
    products[index] = item;

    // Update state with the copy
    this.setState({
      products
    });
  }


  handleUserChange(event) {
    const user = this.state.userData;
    user[event.target.id] = event.target.value;

    this.setState({
      userData: user
    });
  }


  getFiles(index, files) {
    // Copy the Product being changed
    const newProduct = this.state.products[index];
    // Replace Product's files with @files
    newProduct.setFiles(files);

    // Add the new product to a copy of the current state
    const products = this.state.products;
    products[index] = newProduct;

    // Update state with the copy
    this.setState({
      products
    })
  }


  // Handles form submission. Displays submission results.
  handleSubmit(e) {
    e.preventDefault();

    // Display feedback of loading
    this.setState({
      ...this.state,
      status: 'loading'
    })

    // Construct object that is to be submitted
    const formData = this.state;
    // Add language to form data
    formData.language = this.state.translations.language;

    // Create a Mailer to build and send emails
    const mailer = new Mailer();

    // Build email
    const email = mailer.buildEmail(this.state);

    // Send mail and handle result in a callback function.
    mailer.sendMail(email, (response) => {
      // Mail sent successfully
      if(response.result === 'success') {
        this.resetForm();
        this.setState({
          ...this.state,
          status: 'complete'
        });
      }
      // Mail could not be sent
      else if(response.result === 'error') {
        console.log("Mail could not be sent.", response);
        this.setState({
          ...this.state,
          status: 'error'
        });
      }
      // Unknown error
      else {
        console.log("Unknown error when sending mail.");
        this.setState({
          ...this.state,
          status: 'error'
        });
      }
    });
  }


  // Get Submit status
  getSubmitStatus() {
    switch(this.state.status) {
      case 'ready':
        return {
          status: this.state.translations.general.submit,
          style: 'primary'
        }
      case 'loading':
        return {
          status: this.state.translations.general.loading,
          style: 'warning'
        }
      case 'complete':
        return {
          status: this.state.translations.general.complete,
          style: 'success'
        }
      case 'error':
        return {
          status: this.state.translations.general.error,
          style: 'danger'
        }
      default:
        return {
          status: this.state.translations.general.submit,
          style: 'primary'
        }
    }
  }


  // Enables and disables submit button
  canSubmit(state) {
    function userDataComplete(state) {
      const u = state.userData;
      if(u.name && u.phone && u.email && u.country)
        return true;
      else
        return false;
    }
    return userDataComplete(state);
  }


  // Create a product form. Adds relevant data to state.
  createProductForm() {
    // Create a new Product in state
    const productArray = this.state.products;
    productArray.push(new Product());

    const { currentState } = this.state;
    // Create an updated version of this state
    const newState = {
      // Everything already in state
      ...currentState,
      // Changed property
      products: productArray
    };
    // Replace state with updated one
    this.setState(newState);
  }



  render() {
    // Change the button event handlers: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    return (
      <div className="AppPage">
        <Row>
          <Col xs={12}>
            <Button
              onClick={() => this.changeLanguage(en)}
              className="button--language"
              active={this.state.translations === en}>
              {en.language}
            </Button>
            <Button
              onClick={() => this.changeLanguage(fr)}
              className="button--language"
              active={this.state.translations === fr}>
              {fr.language}
            </Button>
          </Col>
        </Row>

        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12}>
              <ProductFormContainer
                translations={this.state.translations}
                products={this.state.products}
                handleChange={this.handleProductChange.bind(this)}
                handleOptionChange={this.handleOptionChange.bind(this)}
                getFiles={this.getFiles.bind(this)}
                createProductForm={this.createProductForm.bind(this)}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Panel
                header={<h2>{ this.state.translations.user.contactInformation }</h2>}
                bsStyle={ this.getSubmitStatus().style }>
                
                <UserForm
                  translations={ this.state.translations.user }
                  userData={ this.state.userData }
                  handleChange={this.handleUserChange.bind(this)}
                />

                <Row>
                  <Col xs={12}>
                    <Button
                      type="submit"
                      bsSize="large"
                      className="center button--submit"
                      bsStyle={ this.getSubmitStatus().style }
                      disabled={!this.canSubmit(this.state)}
                    >
                      { this.getSubmitStatus().status }
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default App;

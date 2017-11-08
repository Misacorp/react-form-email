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
      }
    }

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeLanguage(lang) {
    this.setState({ translations: lang });
    console.log(`Current language: ${this.state.translations.language}`);
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

    console.log("Updated products:", this.state.products[index]);
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


  handleSubmit(e) {
    e.preventDefault();

    // Construct object that is to be submitted
    const formData = this.state;
    // Add language to form data
    formData.language = this.state.translations.language;

    // Create a Mailer to build and send emails
    const mailer = new Mailer();

    // Build email
    const email = mailer.buildEmail(this.state);

    console.log("Sending email. Content: ", email);

    // Send mail
    // mailer.sendMail(email);
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
            <Button onClick={() => this.changeLanguage(en)} className="button--language">{en.language}</Button>
            <Button onClick={() => this.changeLanguage(fr)} className="button--language">{fr.language}</Button>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <form onSubmit={this.handleSubmit}>
              <ProductFormContainer
                translations={this.state.translations}
                products={this.state.products}
                handleChange={this.handleProductChange.bind(this)}
                handleOptionChange={this.handleOptionChange.bind(this)}
                getFiles={this.getFiles.bind(this)}
              />

              <Row>
                <Col xs={6}>
                  <Button onClick={this.createProductForm.bind(this)} >
                    { this.state.translations.general.newProduct }
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Panel>
                    <h2>Contact Information</h2>
                    <UserForm
                      translations={ this.state.translations.user }
                      userData={ this.state.userData }
                      handleChange={this.handleUserChange.bind(this)}
                    />
                  </Panel>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <Button type="submit" bsSize="large" bsStyle="primary">{ this.state.translations.general.submit }</Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

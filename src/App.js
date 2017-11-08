import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import './App.css';
import Product from './Components/Product';
import ProductFormContainer from './Components/ProductFormContainer';
import Mailer from './Components/Mailer';

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
        new Product("Red", "Boye")
      ]
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
    console.log(this);


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
  handleChange(index, event) {
    // Updated product item
    const newProduct = this.state.products[index].setProperty(event.target.id, event.target.value);
    // Add item to a copy of the current state
    const products = this.state.products;
    products[index] = newProduct;
    // Update state with the copy
    this.setState({
      products
    });


  }



  handleSubmit(e) {
    e.preventDefault();

    // Construct object that is to be submitted
    const formData = this.state;
    // Add language to form data
    formData.language = this.state.translations.language;
    console.log(formData);

    // Create and send email
    const email = {
      html: this.buildEmail(),
      attachments: this.state.files
    }

    console.log("Sending email. Content: ");
    console.log(email);

    const mailer = new Mailer();
    mailer.sendMail(email);
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
          <Button onClick={() => this.changeLanguage(en)} className="button--language">{en.language}</Button>
          <Button onClick={() => this.changeLanguage(fr)} className="button--language">{fr.language}</Button>
        </Row>

        <Row>
          <form onSubmit={this.handleSubmit}>
            <ProductFormContainer
              translations={this.state.translations}
              products={this.state.products}
              handleChange={this.handleChange.bind(this)}
            />
            <Row>
              <Button onClick={this.createProductForm.bind(this)} >
                New Product
              </Button>
            </Row>

            <Row>
              <Button type="submit" bsSize="large" bsStyle="primary">Submit</Button>
            </Row>
          </form>
        </Row>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import BuyInForm from './Components/BuyInForm';

// Translations
import en from './translations/en.json';
import fr from './translations/fr.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //  Define translation object
      translations: en
    }
  }

  changeLanguage(lang) {
    this.setState({ translations: lang });
    console.log(`Current language: ${this.state.translations.language}`);
  }

  render() {
    // Change the button event handlers: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    return (
      <div>
        <Button onClick={() => this.changeLanguage(en)}>{en.language}</Button>
        <Button onClick={() => this.changeLanguage(fr)}>{fr.language}</Button>
        <BuyInForm translations={this.state.translations} />
      </div>
    );
  }
}

export default App;

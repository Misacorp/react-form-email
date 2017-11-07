import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import './App.css';
import ProductForm from './Components/ProductForm';

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
      <div className="AppPage">
        <Button onClick={() => this.changeLanguage(en)} className="button--language">{en.language}</Button>
        <Button onClick={() => this.changeLanguage(fr)} className="button--language">{fr.language}</Button>
        <Panel className="Panel">
          <ProductForm translations={this.state.translations} />
        </Panel>
      </div>
    );
  }
}

export default App;

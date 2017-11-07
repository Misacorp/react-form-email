import React, { Component } from 'react';
import FieldGroup from './FieldGroup';
import FileBase64 from 'react-file-base64';

class ProductForm extends Component {

  getFiles(files) {
    this.setState({
      files: [
        ...this.props.productData.files,
        ...files
      ]
    });

    console.log(this.props.productData.files);
  }



  render() {
    const translations = this.props.translations;

    return (
      <div>
          <FieldGroup
            id="brand"
            type="text"
            label={translations.brand.name}
            placeholder={translations.brand.placeholder}
            help={translations.brand.help}
            value={this.props.productData.brand}
            onChange={this.props.handleChangeFor('brand')}
          />

          <FieldGroup
            id="model"
            type="text"
            label={translations.model.name}
            placeholder={translations.model.placeholder}
            help={translations.model.help}
            value={this.props.productData.model}
            onChange={this.props.handleChangeFor('model')}
          />

          <FileBase64
            multiple={ true }
            onDone={ this.getFiles.bind(this) }
          />
      </div>
    );
  }
}

export default ProductForm;
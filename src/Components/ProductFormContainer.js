import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ProductForm from './ProductForm';

// Takes in an array of Product objects
// Renders a ProductForm for each object
class ProductFormContainer extends Component {
  render() {
    const products = this.props.products;

    return(
      <div>
        {products.map((product, index) => 
          <div key={index}>
            <Panel>
              <ProductForm
                translations={ this.props.translations }
                productData={ this.props.products[index] }
                handleChange={ (e) => { this.props.handleChange(index, e) }}
                getFiles={ (e) => { this.props.getFiles(index, e) }}
              />
            </Panel>
          </div>
        )}
      </div>
    )
  }
}

export default ProductFormContainer;
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ProductForm from './ProductForm';

class ProductFormContainer extends Component {
  // Takes in an array of Product objects
  // Renders a ProductForm for each object

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
              />
            </Panel>
          </div>
        )}
      </div>
    )
  }
}

export default ProductFormContainer;
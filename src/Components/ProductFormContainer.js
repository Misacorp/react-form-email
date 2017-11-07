import React, { Component } from 'react';
import { Row, Panel } from 'react-bootstrap';
import ProductForm from './ProductForm';

class ProductFormContainer extends Component {
  // Takes in an array of Product objects
  // Renders a ProductForm for each object

  render() {
    const products = this.props.products;

    console.log(this.props.products);

    return(
      <div>
        {products.map((product, index) => 
          <div>
            <Panel>
              <ProductForm
                translations={this.props.translations}
                productData={this.props.products[index]}
                handleChangeFor={this.props.handleChangeFor}
              />
            </Panel>
          </div>
        )}
      </div>
    )
  }
}

export default ProductFormContainer;
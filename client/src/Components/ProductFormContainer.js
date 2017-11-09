import React, { Component } from 'react';
import { Image, PageHeader, Button, Col, Row, Panel } from 'react-bootstrap';
import ProductForm from './ProductForm';

// Takes in an array of Product objects
// Renders a ProductForm for each object
class ProductFormContainer extends Component {
  getTitle(index) {
    return <h2>{ this.props.products[index].brand ? `${this.props.products[index].brand} ${this.props.products[index].model}` : this.props.translations.general.newProduct }</h2>
  }

  render() {
    const products = this.props.products;

    return(
      <div>
        <Row>
          <Col xs={8}>
            <h1>{ this.props.translations.general.title }</h1>
          </Col>
        </Row>

        {products.map((product, index) => 
          <div key={index}>
            <Panel header={this.getTitle(index)} bsStyle="primary">
              <ProductForm
                translations={ this.props.translations }
                productData={ products[index] }
                handleChange={ (e) => { this.props.handleChange(index, e) }}
                handleOptionChange={ (e) => {this.props.handleOptionChange(index, e) }}
                getFiles={ (e) => { this.props.getFiles(index, e) }}
              />
            </Panel>
          </div>
        )}

        <Row>
          <Col xs={12}>
            <Button
              onClick={this.props.createProductForm.bind(this)}
              bsStyle="primary"
              className="center button--add-product"
            >
              { this.props.translations.general.newProduct }
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProductFormContainer;
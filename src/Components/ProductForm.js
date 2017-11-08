import React, { Component } from 'react';
import { Col, Row, Radio, FormGroup, HelpBlock } from 'react-bootstrap';
import FieldGroup from './FieldGroup';
import FileBase64 from 'react-file-base64';

class ProductForm extends Component {
  render() {
    const translations = this.props.translations;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2>{ this.props.productData.brand ? `${this.props.productData.brand} ${this.props.productData.model}` : translations.general.newProduct }</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <FieldGroup
              id="brand"
              type="text"
              label={ translations.brand.name }
              placeholder={ translations.brand.placeholder }
              help={ translations.brand.help }
              value={ this.props.productData.brand }
              onChange={ this.props.handleChange.bind(this) }
            />
          </Col>

          <Col xs={12} md={6}>
            <FieldGroup
              id="model"
              type="text"
              label={ translations.model.name }
              placeholder={ translations.model.placeholder }
              help={ translations.model.help }
              value={ this.props.productData.model }
              onChange={ this.props.handleChange.bind(this) }
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <h3>{ translations.condition.name }</h3>
            <HelpBlock>{ translations.condition.help } </HelpBlock>

            <FormGroup>
              <Radio name="condition">
                { translations.condition.options.perfect }
              </Radio>
              <Radio name="condition">
                { translations.condition.options.useable }
              </Radio>
              <Radio name="condition">
                { translations.condition.options.broken }
              </Radio>
              <Radio name="condition">
                { translations.condition.options.unknown }
              </Radio>
            </FormGroup>
          </Col>

          <Col xs={12} md={6}>
            <h3>{ translations.images.name }</h3>
            <FileBase64
              multiple={ true }
              onDone={ this.props.getFiles.bind(this) }
            />
            <HelpBlock>{ translations.images.help } </HelpBlock>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductForm;
class Product {
  constructor(brand, model) {
    this.brand = brand || 'Cool';
    this.model = model || 'Beans';
    this.files = [];
  }

  getBrand() {
    return this.brand;
  }

  getModel() {
    return this.model;
  }

  getFiles() {
    return this.files;
  }

  setProperty(property, value) {
    this[property] = value;
    return this;
  }
}

export default Product;
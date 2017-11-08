class Product {
  constructor(brand, model, condition) {
    this.brand = brand || '';
    this.model = model || '';
    this.condition = condition || 'unknown';
    this.files = [];
  }
  
  setProperty(property, value) {
    this[property] = value;
    return this;
  }

  setFiles(fileArray) {
    this.files = fileArray;
  }
}

export default Product;
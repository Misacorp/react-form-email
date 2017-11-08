class Product {
  constructor(brand, model) {
    this.brand = brand || '';
    this.model = model || '';
    this.files = [];
  }
  
  setProperty(property, value) {
    this[property] = value;
    return this;
  }

  setFiles(fileArray) {
    this.files = fileArray;
    console.log("New files:", this.files);
  }
}

export default Product;
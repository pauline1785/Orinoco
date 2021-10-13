class Product{
    constructor(jsonProduct){
        this._id = jsonProduct._id;
        this.name = jsonProduct.name;
        this.price = jsonProduct.price;
        this.description = jsonProduct.description;
        this.imageUrl = jsonProduct.imageUrl;
        this.colors = jsonProduct.colors;
    }
}


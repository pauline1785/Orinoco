function addProduct(productId){
    let productAdd = getProduct();
    productAdd.push({id: productId, Image: product.imageUrl, Name: product.name, Price : product.price});
    saveProduct(productAdd);
}

function removeProduct(productId){
    let productAdd = getProduct();
    productAdd = productAdd.filter(product => product._id != productId);
    saveProduct(productAdd);
}

function getProduct(){
    let productAdd = localStorage.getItem("productAdd");
    if(productAdd == null){
        return [];
    }else{
        return JSON.parse(productAdd);
    }
}

function getProductId(){
    return getProduct().map(product => product._id);
}

function saveProduct(productAdd){
    localStorage.setItem("productAdd",JSON.stringify(productAdd));
}
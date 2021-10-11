function addProduct(articleId){
    let listFavorites = getProduct();
    listFavorites.push({id: articleId, date: new Date()});
    saveFavorites(listFavorites);
}

function removeProduct(articleId){
    let listFavorites = getProduct();
    listFavorites = listFavorites.filter(favorites => favorites.id != articleId);
    saveFavorites(listFavorites);
}

function getProduct(){
    let listFavorites = localStorage.getItem("listFavorites");
    if(listFavorites == null){
        return [];
    }else{
        return JSON.parse(listFavorites);
    }
}

function getFavoritesId(){
    return getFavorites().map(favorite => favorite.id);
}

function saveProduct(listFavorites){
    localStorage.setItem("listFavorites",JSON.stringify(listFavorites));
}
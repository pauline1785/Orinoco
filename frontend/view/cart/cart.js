/* AFFICHAGE DES DONNES RECUPEREES DANS LE LOCALSTORAGE */

// récupération du local Storage
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

/* **** Affichage des produits dans le panier **** */
// sélection de la classe où l'on injecte le html
const cartHtml = document.querySelector(".cart");

// verifier si le panier est vide ou pas
let structureProductCart = [];

if(productInLocalStorage === null || productInLocalStorage == 0){
    const emptyCart = ` 
    <section class="cart__items">
        <div>Le panier est vide</div>
    </section> 
    `;
    cartHtml.innerHTML = emptyCart;
}else{
    for(k=0; k < productInLocalStorage.length; k++){
        structureProductCart = structureProductCart + `
        <section class="cart__items">
            <div class="cart__items__img">
                <img src="${productInLocalStorage[k].imageUrl}" alt="Photo d'un ours en peluche">
            </div>
            <div class="cart__items__content">
                <h2>${productInLocalStorage[k].name}</h2>
                <p>${productInLocalStorage[k].price}€</p>
                <p>Quantité</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
                <button class="item_delete><i class="far fa-trash-alt"></i></button>
            </div>
        </section>
         `;
    }
    if(k == productInLocalStorage.length){
        cartHtml.innerHTML = structureProductCart;
    }
}

// bouton supprimer un article du panier
/*let productDelete = document.querySelector(".item_delete");

for(let l = 0; l < productDelete.length; l++){
    productDelete.addEventListener("click", function(event) {
        event.preventDefault();

        let idSelectDelete = productInLocalStorage[l].id;

        productInLocalStorage = productInLocalStorage.filter(elt => elt.id != id);

        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        
    })
}*/
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
                <button class="item_delete"><i class="far fa-trash-alt"></i></button>
            </div>
        </section>
         `;
    }
    if(k == productInLocalStorage.length){
        cartHtml.innerHTML = structureProductCart;
    }
};

// bouton supprimer un article du panier
/*let productDelete = document.querySelector(".item_delete");

for(let l = 0; l < productDelete.length; l++){
    productDelete.addEventListener("click", function(event) {
        event.preventDefault();

        let idSelectDelete = productInLocalStorage[l]._id; 

        productInLocalStorage = productInLocalStorage.filter(elt => elt.id !== idSelectDelete);

        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        
    })
}*/


/* **** Total du panier **** */
let calculTotal = [];

// aller chercher tous les prix
for(let m = 0; m < productInLocalStorage.length; m ++){
    let productPriceInCart = productInLocalStorage[m].price;

    calculTotal.push(productPriceInCart)
}

// additionner les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = calculTotal.reduce(reducer, 0);

// affichage du total dans le HTML
const totalPriceHTML = `
    <section class="cart__price">
        <p>Total : <span>${totalPrice} €</span></p>
    </section>
`;
// beforeend permet de placer le HTML à l'intérieur de l'élément (div cart), après son dernier enfant
cartHtml.insertAdjacentHTML("beforeend", totalPriceHTML);


/* **** Formulaire validation commande **** */
const orderHTML = () => {
    const formHTML = document.querySelector(".cart");
const formStructure = `
    <section class="cart__order">
        <h3>Finaliser la commande :</h3>
        <form method="get" class="cart__order__form">
            <div class="cart__order__form__question">
                <label for="lastName">Nom: </label>
                <input type="text" name="lastName" id="lastName" required>
            </div>
            <div class="cart__order__form__question">
                <label for="firstName">Prénom: </label>
                <input type="text" name="firstName" id="firstName" required>
            </div>
            <div class="cart__order__form__question">
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="cart__order__form__question">
                <label for="address">Adresse: </label>
                <input type="text" name="address" id="address" required>
            </div>
            <div class="cart__order__form__question">
                <label for="postalCode">Code postal: </label>
                <input type="text" name="postalCode" id="postalCode" required>
            </div>
            <div class="cart__order__form__question">
                <label for="city">Ville: </label>
                <input type="text" name="city" id="city" required>
            </div>
            <div class="cart__order__form__submit">
                <button type="submit" id="order">Valider la commande</button>
            </div>
        </form>
    </section>
`;

formHTML.insertAdjacentHTML("beforeend", formStructure);

};

orderHTML();


/* **** Récupération des données du formulaire **** */
//sélection du bouton submit pour faire un event listener dessus
const buttonSubmit = document.querySelector("#order");

buttonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    //récupération des données du formulaire
    let formOptions = {
        name: document.querySelector("#lastName").value,
        firstName : document.querySelector("#firstName").value,
        email : document.querySelector("#email").value,
        address : document.querySelector("#address").value,
        postalCode : document.querySelector("#postalCode").value,
        city : document.querySelector("#city").value,
    }

    //validation du formulaire


    // mettre les données du formulaire dans le local storage
    localStorage.setItem("formOptions", JSON.stringify(formOptions));
    
    //regroupement des produits et des données du formulaire
    const submitOrder  = {
        productInLocalStorage, formOptions
    }
    console.log("submitOrder");
    console.log(submitOrder);

});


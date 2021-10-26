/* AFFICHAGE DES PRODUITS DU LOCALSTORAGE + PRIX TOTAL + ENVOI DE LA COMMANDE */

// récupération du local storage
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

/* **** Affichage des produits dans le panier **** */
// sélection de la classe où l'on injecte le html
const cartHtml = document.querySelector(".cart");

// verifier si le panier est vide ou pas
let structureProductCart = [];

if(productsInLocalStorage === null || productsInLocalStorage == 0){
    const emptyCart = ` 
    <section class="cart__items">
        <p>Le panier est vide</p>
    </section> 
    `;
    cartHtml.innerHTML = emptyCart;
}else{
    for(i=0; i < productsInLocalStorage.length; i++){
        structureProductCart = structureProductCart + `
        <section class="cart__items">
            <div class="cart__items__img">
                <img src="${productsInLocalStorage[i].imageUrl}" alt="Photo d'un ours en peluche">
            </div>
            <div class="cart__items__content">
                <h2>${productsInLocalStorage[i].name}</h2>
                <p>${productsInLocalStorage[i].price}€</p>
                <p>Quantité</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="10" value="1">
                <button class="item_delete" data-parent="${productsInLocalStorage[i].id}"><i class="far fa-trash-alt"></i></button>
            </div>
        </section>
         `;
    }
    if(i == productsInLocalStorage.length){
        cartHtml.innerHTML = structureProductCart;
    }
};

// bouton supprimer un article du panier
/*let productDeleteTab = document.querySelector(".item_delete");

    productDeleteTab.addEventListener("click", function(event){
        event.preventDefault();
        let btnDelete = event.target;

        let idSelectDelete = productInLocalStorage[0].id; 
        productsInLocalStorage = productsInLocalStorage.filter(elt => elt.id !== idSelectDelete);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));  
});*/



/* **** Total du panier **** */
let calculTotal = [];

// aller chercher tous les prix
for(let i = 0; i < productsInLocalStorage.length; i ++){
    let productPriceInCart = productsInLocalStorage[i].price;

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
                    <br><span id="email_invalid"></span>
                </div>
                <div class="cart__order__form__question">
                    <label for="address">Adresse: </label>
                    <input type="text" name="address" id="address" required>
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

    //validation du formulaire en utilisant les Expressions Régulières (regex)
    function emailValid(value){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }
    //fonction qui controle de la validité de l'email
    email.addEventListener("change", function (event) {
        if (emailValid(email.value)){
        } else {
            document.querySelector("#email_invalid").textContent = "Veuillez saisir un email valide.";
        }
    });
    

/* **** Récupération des données du formulaire **** */
//sélection du bouton submit pour faire un event listener dessus
const buttonSubmitForm = document.querySelector("#order");

buttonSubmitForm.addEventListener("click", function(event){
    if(emailValid(email.value)){
        event.preventDefault();
        //récupération des données du formulaire + les ID des produits du panier
        const contact = new Contact();
        console.log(contact);

        const idCart = [];
        for(i = 0; i < productsInLocalStorage.length; i++){
            idCart.push(productsInLocalStorage[i].id);
        }
        let products = idCart;
        console.log(products);

        // mettre les données du formulmaire dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));

        //envoi de la commande vers le server
        const sendOrder = fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact, products)
        })
        console.log("sendOrder");
        console.log(sendOrder);
        /*.then((response) => response.json())
        .then((json) => {
            localStorage.setItem("orderId", json.orderId);
        })
        .catch((error) => {
            console.error("Error:", error);
        });*/
    }else{
        alert("Veuillez remplir le formulaire.");
    }
    

    
    
});


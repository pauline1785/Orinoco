/* AFFICHAGE DES PRODUITS DU LOCALSTORAGE + PRIX TOTAL + ENVOI DE LA COMMANDE */

// récupération du local storage
let products = JSON.parse(localStorage.getItem("product"));

/* **** Affichage des produits dans le panier **** */
// sélection de la classe où l'on injecte le html
const cartHtml = document.querySelector(".cart");

// verifier si le panier est vide ou pas
let structureProductCart = [];

if(products === null || products == 0){
    const emptyCart = ` 
    <section class="cart__items">
        <p>Le panier est vide</p>
    </section> 
    `;
    cartHtml.innerHTML = emptyCart;
}else{
    for(i=0; i < products.length; i++){
        structureProductCart = structureProductCart + `
        <section class="cart__items">
            <div class="cart__items__img">
                <img src="${products[i].imageUrl}" alt="Photo d'un ours en peluche">
            </div>
            <div class="cart__items__content">
                <h2>${products[i].name}</h2>
                <p>${products[i].price}€</p>
                <p>Quantité</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="10" value="1">
                <button class="item_delete" data-parent="${products[i].id}"><i class="far fa-trash-alt"></i></button>
            </div>
        </section>
         `;
    }
    if(i == products.length){
        cartHtml.innerHTML = structureProductCart;
    }
};

// bouton supprimer un article du panier
/*let productDeleteTab = document.querySelector(".item_delete");

    productDeleteTab.addEventListener("click", function(event){
        event.preventDefault();
        let btnDelete = event.target;

        let idSelectDelete = productInLocalStorage[0].id; 
        productInLocalStorage = productInLocalStorage.filter(elt => elt.id !== idSelectDelete);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));  
});*/



/* **** Total du panier **** */
let calculTotal = [];

// aller chercher tous les prix
for(let i = 0; i < products.length; i ++){
    let productPriceInCart = products[i].price;

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
                    <br><span id="email_invalid"></span>
                </div>
                <div class="cart__order__form__question">
                    <label for="address">Adresse: </label>
                    <input type="text" name="address" id="address" required>
                </div>
                <div class="cart__order__form__question">
                    <label for="postalCode">Code postal: </label>
                    <input type="text" name="postalCode" id="postalCode" required>
                    <br><span id="postalcode_invalid"></span>
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
const buttonSubmitForm = document.querySelector("#order");

buttonSubmitForm.addEventListener("click", function(event){
    event.preventDefault();
    //récupération des données du formulaire
    const contact = new Form();

    //validation du formulaire en utilisant les Expressions Régulières (regex)
    const regExEmail = (value) =>{
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    const regExCodePostal = (value) =>{
        return /^[0-9]{5}$/.test(value);
    }

    //controle de la validité de l'email
    function emailControl(){
        const emailValid = contact.email;
        if(regExEmail(emailValid)){
            return true;
        }else{
            document.querySelector("#email_invalid").textContent = "Veuillez saisir un email valide.";
            return false;
        }
    }
    //controle de la validité du code postal
    function postalCodeControl(){
        const postalCodeValid = contact.postalCode;
        if(regExCodePostal(postalCodeValid)){
            return true;
        }else{
            document.querySelector("#postalcode_invalid").textContent = "Veuillez saisir un Code Postal à 5 chiffres.";
            return false;
        }
    }

    // mettre les données du formulaire dans le local storage si le formulaire est validé
    if(emailControl() && postalCodeControl()){
        localStorage.setItem("contact", JSON.stringify(contact));
    }else{
        alert("Veuillez remplir le formulaire.");
    }
    
    //regroupement des produits et des données du formulaire
    const customerOrder  = {
        products, contact
    }

    //envoi de la commande vers le server
    fetch("http://localhost:3000/api/teddies/order" , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products, contact),
    })
    .then(response => response.json())
});


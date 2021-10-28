/* AFFICHAGE DES PRODUITS DU LOCALSTORAGE + PRIX TOTAL + ENVOI DE LA COMMANDE */

// récupération du local storage
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

/* **** Affichage des produits dans le panier **** */
// sélection du DOM pour injecter le HTML
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
/*let productDelete = document.querySelector(".item_delete");

for (let i = 0; i < productDelete.length; i++) {
    productDelete[i].addEventListener("click", (event) => {
        event.preventDefault();

        let idDelete = productsInLocalStorage[i].id;

        productsInLocalStorage  = productsInLocalStorage.filter(
            (el) => el.id !== idDelete
        );

        localStorage.setItem("products", JSON.stringify(productsInLocalStorage));
    })
};*/



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

// envoi du prix total dans le local storage
localStorage.setItem("totalPrice", JSON.stringify(totalPrice));



/* **** Formulaire **** */
// validation du formulaire en utilisant les Expressions Régulières (regex)
function namesAndCityValid(value){
    return /^[A-Z-a-z\s]{3,40}$/.test(value);
}

function emailValid(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function addressValid(value){
    return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value);
}
// fonction qui controle de la validité de l'email
firstName.addEventListener("change", function (event) {
    if (namesAndCityValid(firstName.value)){
    } else {
        document.querySelector("#firstname_invalid").textContent = "Veuillez saisir un prénom sans chiffres ni symboles";
    }
});

lastName.addEventListener("change", function (event) {
    if (namesAndCityValid(lastName.value)){
    } else {
        document.querySelector("#lastname_invalid").textContent = "Veuillez saisir un nom sans chiffres ni symboles";
    }
});

email.addEventListener("change", function (event) {
    if (emailValid(email.value)){
    } else {
        document.querySelector("#email_invalid").textContent = "Veuillez saisir un email valide.";
    }
});

address.addEventListener("change", function (event) {
    if (addressValid(address.value)){
    } else {
        document.querySelector("#address_invalid").textContent = "Veuillez saisir una adresse valide.";
    }
});

city.addEventListener("change", function (event) {
    if (namesAndCityValid(city.value)){
    } else {
        document.querySelector("#city_invalid").textContent = "Veuillez saisir une ville valide";
    }
});

formValid = () => {
    if(namesAndCityValid(firstName.value) && emailValid(email.value) && addressValid(address.value)){
        return true;
    }   
};

/* **** Récupération des données **** */
// sélection du bouton submit pour faire un event listener dessus
const buttonSubmitForm = document.querySelector("#order");

buttonSubmitForm.addEventListener("click", function(event){
    if(formValid()){
        event.preventDefault();
        // récupération des données du formulaire + les ID des produits du panier
        const contact = new Contact();

        const idCart = [];
        for(i = 0; i < productsInLocalStorage.length; i++){
            idCart.push(productsInLocalStorage[i].id);
        }
        let products = idCart;

        // mettre les données du formulmaire dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
        // regroupement des données du panier dans une variable
        const customerOrder = {
            contact,
            products
        };
        // envoi de la commande vers le server
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerOrder)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Erreur d\'envoi de la commande');
            }
        })
        .then(json => {
            // stockage de l'Id retourné par l'API dans le local storage
            localStorage.setItem("orderId", json.orderId);
            // redirection vers la page confirmation
            return (window.location.href = `../confirmation/confirmation.html?orderId=${json.orderId}`);
        })
        .catch(error => {
            alert(error);
        });
    } else{
        alert("Veuillez remplir le formulaire.");
    }
    

    
    
});


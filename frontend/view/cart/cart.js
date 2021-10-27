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

// envoi du prix total dans le local storage
localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

/* **** Formulaire **** */
// validation du formulaire en utilisant les Expressions Régulières (regex)
function emailValid(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}
// fonction qui controle de la validité de l'email
email.addEventListener("change", function (event) {
    if (emailValid(email.value)){
    } else {
        document.querySelector("#email_invalid").textContent = "Veuillez saisir un email valide.";
    }
});



/* **** Récupération des données **** */
// sélection du bouton submit pour faire un event listener dessus
const buttonSubmitForm = document.querySelector("#order");

buttonSubmitForm.addEventListener("click", function(event){
    if(emailValid(email.value)){
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


/* FICHE PRODUIT DE L ARTICLE CHOISI EN PAGE D ACCUEIL */

//récupération de l'ID du produit dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId= urlParams.get("id");


fetch("http://localhost:3000/api/teddies/" + productId)
    .then(function(response) {
        let teddie = response.json();
        return teddie;
        })
    .then(function(teddie){
        let product = new Product(teddie);
        let productHtml = `<div class="product">
                                <img class="product__img" src="${product.imageUrl}"/>

                                <div class="product__infos">
                                    <h1>${product.name}</h1>
                                    <h2>${product.price}€</h2>
                                    <p>${product.description}</p>

                                    <div class="product__infos__colors">
                                        <h3>Choix de la couleur</h3>
                                        <div class="color-choices">
                                            <ul>`;
        //boucle avec condition pour verifier si la couleur est compréhensible en css
        let colorHtml = "" ;
            for(let i=0; i< product.colors.length; i++){
                if(product.colors[i] == "Pale brown"){
                    color = "beige";
                }else if(product.colors[i] == "Dark brown"){
                    color = "brown";
                }else{
                    color = product.colors[i];
                }
                colorHtml += `<li>
                                <input type="radio" name="choice" id="choice01">
                                <label for="choice01" style="background-color: ${color};"></label>
                            </li>`;
            }

        let endProductHtml = `      </ul>
                                    </div>
                                </div>
                                <button id="addToCart" type="submit" name="addToCart">Ajouter au panier</button>
                            </div>
                        </div>`;

        //on concatene les trois parties
        document.querySelector(".container").innerHTML = productHtml + colorHtml + endProductHtml;                                          

       
        
/* **** Gestion du panier **** */

    // récupération et écoute du bouton "ajouter au panier"   
    const cartButton = document.querySelector("#addToCart");
        cartButton.addEventListener("click", function(event) {
            event.preventDefault();
        });


    // récupération des valeurs du formulaire
    let productOptions = {
        id : product._id,
        imageUrl : product.imageUrl,
        name : product.name,
        price : product.price,
        quantite : 1,
    };



/* **** Local Storage **** */

    // variable dans laquelle on met les key qui sont dans le local storage
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

    // fenêtre popup
    /*const popupValidation = function(){
        if(window.confirm(`${product.name} a bien été ajouté au panier`)){
            window.location.href = "../cart/cart.html";
        }else{
            window.location.href = "../index.html";
        }
    }*/

    // fonction ajout produit au local storage
    const addToLocalStorage  = function(){
        // ajout dans le tableau de l'objet avec les values choisies
        productInLocalStorage.push(productOptions);
        // transformation en JSON puis envoi dans la key du local storage
        localStorage.setItem("product",JSON.stringify(productInLocalStorage));   
    };

    // condition pour vérifier s'il y a déjà ou pas quelque chose dans le local storage
    if(productInLocalStorage){
        addToLocalStorage();

    } else{
        productInLocalStorage = [];
        addToLocalStorage();

    };

});

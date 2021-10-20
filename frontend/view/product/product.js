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
        let productHtml = `
            <div class="product">
                <img class="product__img" src="${product.imageUrl}"/>

                <div class="product__infos">
                    <h1>${product.name}</h1>
                    <h2>${product.price}€</h2>
                    <p>${product.description}</p>

                    <div class="product__infos__colors">
                        <form>
                            <label for="color_choices">Choix de la couleur</label>
                                <select name="color_choices" id="color_choices">
                                    
                                </select>
                    </div>
                        <button id="addToCart" type="submit" name="addToCart">Ajouter au panier</button>
                        </form>
                </div>
            </div>
        `;
                                                
        // adaptation des options couleurs au produit
        const colorChoices = product.colors;
        let colorOptions =  [];
        // boucle pour afficher tous les choix
        for(let j = 0; j < colorChoices.length; j++){
            colorOptions = colorOptions + `
                <option value="${j+1}">${colorChoices[j]}</option>
            `;
        }

        // injection HTML dans la page produit
        document.querySelector(".container").innerHTML = productHtml;
        // injection des otpions dans le formulaire
        document.querySelector("#color_choices").innerHTML = colorOptions;


        
/* **** Gestion du panier **** */

    // récupération et écoute du bouton "ajouter au panier"   
    const cartButton = document.querySelector("#addToCart");
        cartButton.addEventListener("click", function(event) {
            event.preventDefault();

            // récupération des valeurs du formulaire
            let productOptions = {
                id : product._id,
                imageUrl : product.imageUrl,
                name : product.name,
                price : product.price,
                quantite : 1,
            };
            
            // variable dans laquelle on met les key qui sont dans le local storage
            let products = JSON.parse(localStorage.getItem("product"));

            // fonction ajout produit au local storage
            const addToLocalStorage  = function(){
                // ajout dans le tableau de l'objet avec les values choisies
                products.push(productOptions);
                // transformation en JSON puis envoi dans la key du local storage
                localStorage.setItem("product",JSON.stringify(products));   
            };

            // condition pour vérifier s'il y a déjà ou pas quelque chose dans le local storage
            if(products){
                addToLocalStorage();
            }else{
                products = [];
                addToLocalStorage();
            };
        });


    


});

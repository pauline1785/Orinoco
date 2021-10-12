/* AFFICHAGE DE LA FICHE PRODUIT DE L ARTICLE CHOISI EN PAGE D ACCUEIL */

//Récupération de l'ID du produit dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId= urlParams.get("id");


fetch("http://localhost:3000/api/teddies/" + productId)
    .then(function(response) {
        let teddie = response.json();
        return teddie;
        }).then(function(teddie){
            let product = new Product(teddie);
            let productHtml = `<div class="product">
                                    <img class="product__img" src="${product.imageUrl}"/>

                                    <div class="product__infos">
                                        <h1>${product.name}</h1>
                                        <h2>${product.price}€</h2>
                                        <p>${product.description}</p>
                                        <div class="product__colors">
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

            let endProductHtml = `         </ul>
                                        </div>
                                    </div>
                                    <button id="addToCart" type="submit" name="addToCart">Ajouter au panier</button>
                                </div>
                             </div>`;
            //on concatene les trois parties
            document.querySelector(".container").innerHTML = productHtml + colorHtml + endProductHtml;                                          
        })

        
        
/* **** Gestion du panier **** */


// récupération et écoute du bouton "ajouter au panier"   
    const cartButton = document.querySelector("#addToCart");

    cartButton.addEventListener("click", function(event) {
        event.preventDefault();
    });

// récupération des valeurs du formulaire
    let productOptions = {
        id : product._id,
        name : product.name,
        price : product.price,
        quantite : 1,
    };

    console.log(productOptions);


/* **** Local Storage **** */

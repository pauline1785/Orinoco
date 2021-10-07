/* AFFICHAGE DE LA FICHE PRODUIT DE L ARTICLE CHOISI EN PAGE D ACCUEIL */

//On va chercher l'id dans l'URL
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
                                    <button id="add_cart" type="submit" name="add_cart">Ajouter au panier</button>
                                </div>
                             </div>`;
            //on concatene les trois parties
            document.querySelector(".container").innerHTML = productHtml + colorHtml + endProductHtml;                                          
        })

        

/* AJOUT DU PRODUIT DANS LE LOCAL STORAGE */

    let cart = {};
    localStorage.setItem('cart', JSON.stringify(cart));


    function addToCart(product) {
        
    }

        
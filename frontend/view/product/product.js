/* Affichage de la fiche du produit sélectionné à la page d'accueil + envoi le produit vers le local storage */

/* On va chercher l'Id dans l'Url */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//console.log(urlParams.get("id"));

const productId= urlParams.get("id");

fetch("http://localhost:3000/api/teddies/" + productId)
    .then(function(response) {
        let teddie = response.json();
        return teddie;
        }).then(function(teddie){
            //console.log(teddie);
            let product = new Product(teddie);
            let productHtml = `<div class="product">
                                    <img class="product__img" src="${product.imageUrl}"/>

                                    <div class="product__infos">
                                        <h1>${product.name}</h1>
                                        <h2>${product.price}€</h2>
                                        <p>${product.description}</p>
                                        <div class="note">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="far fa-star"></i>
                                            <a href="#"><span>50 avis</span></a>
                                        </div>

                                        <div class="product__colors">
                                            <h3>Choix de la couleur</h3>
                                            <div class="color-choices">
                                                <ul>`;

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
            document.querySelector(".container").innerHTML = productHtml + colorHtml + endProductHtml;                        
                           
        })

/* APPEL DE L'API ET AFFICHAGE DE TOUS LES PRODUITS */

fetch("http://localhost:3000/api/teddies")
    //récupère la réponse du fetch
    .then(function(response){ 
        if(response.ok ){
            let teddies = response.json();
            return teddies;
        }
    // affiche tous les produits sur la page
    }).then(function(teddies) {
        let teddie = '';
        for (let i = 0; i < teddies.length; i++) {
            teddie = teddies[i];
            let product = new Product(teddie);
            document.querySelector(".container").innerHTML += `<div class="products">
                                                                    <a href="product/product.html?id=${product._id}" alt="photo d'ours en peluche">
                                                                        <figure>
                                                                            <img src="${product.imageUrl}"/>
                                                                        </figure>
                                                                        <h3>${product.name}</h3>
                                                                        <p>${product.price}€</p>
                                                                    </a>
                                                                </div>`;
        }
    });



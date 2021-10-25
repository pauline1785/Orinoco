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
        let teddy = '';
        for (let i = 0; i < teddies.length; i++) {
            teddy = teddies[i];
            let product = new Product(teddy);
            document.querySelector(".container").innerHTML += `<div class="products">
                                                                    <a href="product/product.html?id=${product._id}">
                                                                        <figure>
                                                                            <img src="${product.imageUrl}" alt="photo d'ours en peluche"/>
                                                                        </figure>
                                                                        <h3>${product.name}</h3>
                                                                        <p>${product.price}€</p>
                                                                    </a>
                                                                </div>`;
        }
    });



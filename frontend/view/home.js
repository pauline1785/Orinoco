/* Génère l'appel de l'API et l'affichage de tous les produits */


fetch("http://localhost:3000/api/teddies")
// pour gérer le cas d'erreur, si l'api ne fonctionne pas
    .then(function(response){ //récupère la réponse du fetch
        if(response.ok ){
            let teddies = response.json();
            return teddies;
        }else{
            console.log("error");
        }
// pour afficher tous les produits sur la page
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
    })



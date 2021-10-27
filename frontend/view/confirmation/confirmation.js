/* AFFICHAGE DE LA CONFIRMATION DE LA COMMANDE AVEC SON NUMERO */

// récupération de l'ID qui est dans le local storage
let idInLocalStorage = localStorage.getItem("orderId");

// récupération du prix total qui est dans le local storage
let totalPriceInLocalStorage = localStorage.getItem("totalPrice");

// séléction du DOM puis injection du HTML
document.querySelector(".container").innerHTML += `
    <div class="confirmation">
        <h1>Commande validée !</h1>
        <p>Votre commande <span>${idInLocalStorage}</span> d'un montant total de <span>${totalPriceInLocalStorage} €</span> a bien été prise en compte.
        <br>Elle vous sera envoyée dans les 2-3 prochains jours (hors week-end et jours fériés).</p>
        <h2>Merci pour votre commande, à bientôt !</h2>
    </div>
`;


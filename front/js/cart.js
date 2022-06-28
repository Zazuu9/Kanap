var contenu = JSON.parse(localStorage.getItem('Array'));
console.log(contenu);

if (contenu) {

    contenu.forEach(function (cart) {
        
        fetch(`http://localhost:3000/api/products/${cart._ID}`)

        .catch((error)=> {
          alert("Une errreur est survenue")
        })

        .then(function(res) {
            if (res.ok) {
              return res.json();
              }
          })

        .then(function (api) {
            document.querySelector('#cart__items').innerHTML +=
                `<article class="cart__item" data-id="${cart._ID}" data-color="${cart.color}">
                <div class="cart__item__img">
                  <img src="${api.imageUrl}" alt="${api.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${api.name}</h2>
                    <p>${cart.color}</p>
                    <p>${api.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article`;  
        })

        .then(() => {
          totalPriceQuantity();
          supprItem();
        })

        function  totalPriceQuantity() {
          let quantites = document.querySelectorAll(".itemQuantity"); 
            let totalQuantity = 0; /* Déclaration Quantité de  base */
            let totalPrice = 0; /* Déclaration Prix de base */
        
            for (let i = 0; i < quantites.length ; i++) {
                totalQuantity += parseInt(quantites[i].value); /* Récuperation de la quantité*/
            }
        
            document.getElementById("totalQuantity").innerText = totalQuantity; /* Affichage de la quantité total*/
            const descriptions = document.querySelectorAll(".cart__item__content__description");
        
            for (let i = 0; i < descriptions.length ; i++){
                const priceElement = descriptions[i].lastElementChild.innerHTML; /* Récupération du prix*/
                totalPrice += parseInt(quantites[i].value) * parseInt(priceElement); /* Multiplication de la quantité et du prix d'un même canapé */
            }
        
            document.getElementById("totalPrice").innerText = totalPrice;/* Affichage du prix total*/
        }

        function supprItem () {
          let btn_supprimer = document.getElementsByClassName('deleteItem');
          console.log(btn_supprimer);
        
          for (const suppr of btn_supprimer) {
              suppr.addEventListener('click', () => { /* Au clic */

                suppr.closest('article').remove(); /* Défini à suppr une supression*/

                let color = suppr.closest('article').dataset.color; /* Donne à color la supression dur dataset.color à l'article */
                let id = suppr.closest('article').dataset.id; /* Donne à id la supression dur dataset.id à l'article */

                let index = -1; /* Applique -1 a index*/

                contenu.find(item => { 
                  if (item.color == color && item._ID == id) { /* Compare si les item.color et _ID son identique à color et id */
                   index = contenu.indexOf(item);
                  };
                })

                if (index !== -1) {
                  contenu.splice(index, 1); /* Supprime 1 fois l'index cibler */
                  localStorage.setItem('Array', JSON.stringify(contenu));
                  console.log(contenu);
                };
                totalPriceQuantity() /* Rechargement de la fonction totalPriceQuantity() */
              })
          }
        }
    });
}



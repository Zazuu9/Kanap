var contenu = JSON.parse(localStorage.getItem('Array'));
console.log(contenu);

if (contenu) {

    contenu.forEach(function (cart) {
        
        fetch(`http://localhost:3000/api/products/${cart._ID}`)

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
                      <p>Qté : ${cart.qty}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article`;
        })

        function QuantityTotal(cart) {

            let fullQuantity = document.getElementById('totalQuantity');

            let productsQuantity = contenu
            .map((cart) => parseInt(cart.qty))
            .reduce((cart, api) => cart + api);

            fullQuantity.innerHTML = productsQuantity;
        }
        QuantityTotal(cart)

        


        
    });
}
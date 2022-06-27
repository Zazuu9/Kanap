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

      function supprItem () {
        let btn_supprimer = document.getElementsByClassName('deleteItem');
        console.log(btn_supprimer);
        
        for (const suppr of btn_supprimer) {
            suppr.addEventListener('click', () => {
              console.log("Hello");

              suppr.closest('article').remove();

              let color = suppr.closest('article').dataset.color;
              let id = suppr.closest('article').dataset.id;

              let index = -1;

              contenu.find(item => {
                if (cart.qty > 0) {
                  index = contenu.indexOf(item);
                  console.log(cart.qty);
                };
              })
              if (index !== -1) {
                contenu.splice(index);
                localStorage.setItem('Array', JSON.stringify(contenu));
                console.log(contenu);
              };
              location.reload()
            })
        }
      }
    });
    function  totalPriceQuantity() {
      let quantites = document.querySelectorAll(".itemQuantity");
        let totalQuantity = 0;
        let totalPrice = 0;
    
        for (let i = 0; i < quantites.length ; i++) {
            totalQuantity += parseInt(quantites[i].value);
        }
    
        document.getElementById("totalQuantity").innerText = totalQuantity;
        const descriptions = document.querySelectorAll(".cart__item__content__description");
    
        for (let i = 0; i < descriptions.length ; i++){
            const priceElement = descriptions[i].lastElementChild.innerHTML.slice(0,-1);
            totalPrice += parseInt(quantites[i].value) * parseInt(priceElement);
        }
    
        document.getElementById("totalPrice").innerText = totalPrice;
    } 

    
    
}



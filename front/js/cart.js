var contenu = JSON.parse(localStorage.getItem('Array'));
console.log(contenu);

if (contenu) {

    contenu.forEach(function (cart) {
        
        fetch(`http://localhost:3000/api/products/${cart._ID}`)

        .catch((error)=> {
          alert("Oups, il y a une erreur !")
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
          changeQuantity();
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

        function supprItem() {
          let btn_supprimer = document.getElementsByClassName('deleteItem');
        
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

        function changeQuantity() {
          let articlesQuantites = document.querySelectorAll('.itemQuantity');

          articlesQuantites.forEach(function (qty, a) {
            
            qty.addEventListener("change", () => {
              if (qty.value < 1 || qty.value > 100 || qty.value.includes(".")) {
                alert("Veuillez choisir un nombre entier entre 1 et 100.");
              } 
              else {
                let afficherNouveauQuantite = document.querySelectorAll(".cart__item__content__settings__quantity p");
                afficherNouveauQuantite[a].textContent = "Qté : ";
                contenu[a].qty = parseInt(qty.value);
                localStorage.setItem('Array', JSON.stringify(contenu));console.log(contenu);
                  totalPriceQuantity();
              }
            })
          })
        }

        

    });
}

let btnCommand = document.getElementById('order');

  btnCommand.addEventListener('click', function(event) {
    event.preventDefault();

    let nameRegex = /^[a-zA-ZÀ-ÿ\'\-]+$/;
    let localityRegex = /^[À-ÿA-Za-z0-9\s\'\-]{5,55}$/;
    let emailRegex = /^([À-ÿA-Za-z0-9_\-\.])+\@([À-ÿA-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

     let firstName = document.getElementById('firstName').value;
     let validfirstUseName = firstName.match(nameRegex);
     if (validfirstUseName == null){
       alert("Votre Prénom n'est pas valide. seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
       return false;
    }

    let lastName = document.getElementById('lastName').value;
    let validLastName = lastName.match(nameRegex);
    if (validLastName == null){
      alert("Votre Nom n'est pas valide. seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
      return false;
    }  

    let addressLocation = document.getElementById('address').value;
    let ValidAdressLocation = addressLocation.match(localityRegex);
    if (ValidAdressLocation == null){
      alert("Votre Adresse n'est pas valide. Seulement les caractères A-Z, a-z, 0-9, '-', accents et apostrophes sont acceptables.");
      return false;
    }

    let cityLoaction = document.getElementById('city').value;
    let ValidCityLocation = cityLoaction.match(localityRegex);
    if (ValidCityLocation == null){
      alert("Votre Ville n'est pas valide. Seulement les caractères A-Z, a-z, '-', accents et apostrophes sont acceptables.");
      return false;
    }

    let emailContact = document.getElementById('email').value;
    let ValidEmailUser = emailContact.match(emailRegex);
    if (ValidEmailUser == null){
      alert("Votre Email n'est pas valide. Verifiez si votre mail comporte '@' et seuls les caractères A-Z, a-z, 0-9, '-', '_' et '.' sont acceptables.");
        return false;
    }

    let productsId = [];
    for (item of contenu) {
        productsId.push(item);
    }

    const order = {
        contact : {
            firstName : firstName,
            lastName : lastName,
            address : addressLocation,
            city : cityLoaction,
            email : emailContact, 
        },
        products : productsId
    };

    console.log(order);

    fetch('http://127.0.0.1:3000/api/products/order/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then((res) => { 
        document.location.href = `confirmation.html?id=${res.orderId}`;   
    })
    .catch(function() {
        alert("Oups, il y a une erreur !");
    });
  })


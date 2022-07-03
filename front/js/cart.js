var contenu = JSON.parse(localStorage.getItem('Array'));
console.log(contenu);

if (contenu) {

    contenu.forEach(function (a) {
        
        fetch(`http://localhost:3000/api/products/${a._ID}`)

        .catch((error)=> {
          alert("Oups, il y a une erreur !")
        })

        .then(function(res) {
            if (res.ok) {
              return res.json();
              }
          })

        .then(function (b) {
            document.querySelector('#cart__items').innerHTML +=
                `<article class="cart__item" data-id="${a._ID}" data-color="${a.color}">
                <div class="cart__item__img">
                  <img src="${b.imageUrl}" alt="${b.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${b.name}</h2>
                    <p>${a.color}</p>
                    <p>${b.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${a.qty}">
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
          regexFormulaire();
          UserInfos();
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
          let suppr_btn = document.getElementsByClassName('deleteItem');
        
          for (const suppr of suppr_btn) {
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
          let quantityArticle = document.querySelectorAll('.itemQuantity');

          quantityArticle.forEach(function (qty, a) {
            
            qty.addEventListener("change", () => {
              if (qty.value < 1 || qty.value > 100 || qty.value.includes(".")) {
                alert("Veuillez choisir un nombre entier entre 1 et 100.");
              } 
              else {
                let newQuantity = document.querySelectorAll(".cart__item__content__settings__quantity p");
                newQuantity[a].textContent = "Qté : ";
                contenu[a].qty = parseInt(qty.value);
                localStorage.setItem('Array', JSON.stringify(contenu));console.log(contenu);
                  totalPriceQuantity();
              }
            })
          })
        }
    });
}

function regexFormulaire() {

  // Ajout des Regex.
    let selectionClasseForm = document.querySelector(".cart__order__form");

  /*Création des expressions régulières.
    Sources:
      https://regex101.com
      https://learnbyexample.github.io/javascript-regexp-cheatsheet   */
  let firstNameVerif = new RegExp("^[a-zA-Z '-]+$");
  let lastNameVerif = new RegExp("^[a-zA-Z '-]+$");
  let AddressVerif = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let CityVerif = new RegExp("^[a-zA-Z '-]+$");
  let EmailVerif = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

  // Ecoute de la modification du prénom.
  selectionClasseForm.firstName.addEventListener('change', function() {
    firstNameValidation(this);
  });

  // Ecoute de la modification du nom.
  selectionClasseForm.lastName.addEventListener('change', function() {
    lastNameValidation(this);
  });

  // Ecoute de la modification de l'adresse.
  selectionClasseForm.address.addEventListener('change', function() {
    addressValidation(this);
  });

  // Ecoute de la modification de la ville.
  selectionClasseForm.city.addEventListener('change', function() {
    cityValidation(this);
  });

  // Ecoute de la modification de l'e-mail.
  selectionClasseForm.email.addEventListener('change', function() {
    emailValidation(this);
  });

  // Validation du prénom.
  const firstNameValidation = function(inputFirstName) {

      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (firstNameVerif.test(inputFirstName.value)) {
        
          firstNameErrorMsg.innerText = '';

      } else {
          firstNameErrorMsg.innerText = "Veuillez écrire un prénom correct.";
      }
  }

  // Validation du nom.
  const lastNameValidation = function(inputLastName) {

      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (lastNameVerif.test(inputLastName.value)) {
          lastNameErrorMsg.innerText = '';

      } else {
          lastNameErrorMsg.innerText = "Veuillez écrire un nom correct.";
      }
  }

  // Validation de l'adresse.
  const addressValidation = function(inputAddress) {

      let addressErrorMsg = inputAddress.nextElementSibling;

      if (AddressVerif.test(inputAddress.value)) {
        addressErrorMsg.innerText = '';

      } else {
        addressErrorMsg.innerText = "Veuillez écrire une adresse correcte.";
      }
  }

  // Validation de la ville.
  const cityValidation = function(inputCity) {

      let cityErrorMsg = inputCity.nextElementSibling;

      if (CityVerif.test(inputCity.value)) {
        cityErrorMsg.innerText = '';

      } else {
        cityErrorMsg.innerText = "Veuillez écrire une ville correcte.";
      }
  }

  // Validation de l'email.
  const emailValidation = function(inputEmail) {

      let emailErrorMsg = inputEmail.nextElementSibling;

      if (EmailVerif.test(inputEmail.value)) {
        emailErrorMsg.innerText = '';

      } else {
        emailErrorMsg.innerText = "Veuillez écrire un e-mail correct.";
      }
  }
} 

// Fonction: traitement des données utilisateurs.
function UserInfos() {

  // Mise à zéro des champs du formulaire.
  // En cas de rafraichissment de la page l'utilisateur doit renseigner les champs.
  document.getElementById("firstName").value = '';
  document.getElementById("lastName").value = '';     
  document.getElementById("address").value = '';     
  document.getElementById("city").value = '';         
  document.getElementById("email").value = '';

    const achats = document.getElementById('order');

    // Début de order.addEventListener.
    order.addEventListener('click', (event) => {

      event.preventDefault();

      // Ajout des données du formulaire dans un objet.
      const contact = {};
      contact.firstName = document.getElementById("firstName").value;
      contact.lastName = document.getElementById("lastName").value;
      contact.address = document.getElementById("address").value;
      contact.city = document.getElementById("city").value;
      contact.email = document.getElementById("email").value;

      // Vérification finale des données du formulaire.
      if (localStorage.getItem("Array") === null ||

      document.getElementById("firstName").value === '' ||
      document.getElementById("lastName").value === '' ||         
      document.getElementById("address").value === '' ||         
      document.getElementById("city").value === '' ||          
      document.getElementById("email").value === '' ||

      firstNameErrorMsg.innerText != '' ||
      lastNameErrorMsg.innerText != '' || 
      addressErrorMsg.innerText != '' || 
      cityErrorMsg.innerText != '' || 
      emailErrorMsg.innerText != '')
      {
        {
          alert("Erreur avec le panier ou le formulaire");
        }
        return;
      }

      // Tableau des identifiants.
      const products = [];

      contenu.forEach((a) => {
        products.push(a._ID);
        //console.log(products);
      });

      // Création d'un objet et ajout du formulaire de contact et des identifiants.
      const FormProductsObject = {
        contact,
        products
      };

      // Envoi des informations avec la méthode POST.
      const options = {
        method: 'POST',
        body: JSON.stringify(FormProductsObject),
        headers: { 
        'Content-Type': 'application/json',
        }
      };

      // Récupération de orderId.
      fetch("http://localhost:3000/api/products/order", options)
      .then(function(res) {
      if (res.ok) {
        return res.json();
        }
      })

      .then(function(a) {
        document.location.href = `confirmation.html?id=${a.orderId}`;
      })
    }); 
} 
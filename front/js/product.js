var url = window.location.search;
console.log(url);
var id = url.substring(4);
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)

.catch((error)=> {
    alert("Une errreur est survenue")
})

.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})

.then((object) => {
    document.querySelector('.item__img').innerHTML =
    `<img src="${object.imageUrl}" alt="Photographie d'un canapé">`;

    document.getElementById('title').innerText =
    object.name;

    document.getElementById('price').innerText =
    object.price;

    document.getElementById('description').innerText =
    object.description;

    console.log(object.colors);
    
    let colorsid = document.getElementById("colors");

    for(var colorobject of object.colors) {
        let tagOption = document.createElement("option");

        tagOption.innerText = colorobject;
        tagOption.value = colorobject;

        colorsid.add(tagOption);
        
        console.log(tagOption);
    };
})

const idForm = document.querySelector('.item__content__addButton');

const choixForm = idForm.value;
console.log(choixForm);

const btn_envoi = document.querySelector('#addToCart');
console.log(btn_envoi);

btn_envoi.addEventListener("click", (event) => {
    event.preventDefault();
    let optionsProduit = {
        ID: id,
        qty: document.getElementById('quantity').value,
        color: document.getElementById('colors').value,
    }
console.log(optionsProduit);
})





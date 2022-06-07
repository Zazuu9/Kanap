var url = window.location.search;
console.log(url);
var id = url.substring(4);
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)

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
})

.catch((error) => {
    console.log(error);
})

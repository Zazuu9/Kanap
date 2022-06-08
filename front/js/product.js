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

    console.log(object.imageUrl);

    document.getElementById('title').innerText =
    object.name;

    console.log(object.name);

    document.getElementById('price').innerText =
    object.price;

    console.log(object.price);

    document.getElementById('description').innerText =
    object.description;

    console.log(object.description);
    
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

.catch((error) => {
    console.log(error);
})

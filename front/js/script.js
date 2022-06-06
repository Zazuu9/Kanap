fetch("http://localhost:3000/api/products")

.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})

.then((data) => {
     for (let object in data) {
         document.getElementById('items').innerHTML +=
         `<a href="${object._id}">
            <article>
              <img src="${object.imageUrl}" alt="${object.altTxt}">
              <h3 class="productName">${object.name}</h3>
              <p class="productDescription">${object.description}</p>
            </article>
          </a>`
     }                   
})
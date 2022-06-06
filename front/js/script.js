fetch("http://localhost:3000/api/products")

.then(function(res) {
    if(res.ok) {
        return res.json();
    }
})

.then((data) => {
     for (let object in data) {
         document.getElementById('items').innerHTML +=
         `<a href="${data[object]._id}">
            <article>
              <img src="${data[object].imageUrl}" alt="${data[object].altTxt}">
              <h3 class="productName">${data[object].name}</h3>
              <p class="productDescription">${data[object].description}</p>
            </article>
          </a>`
     }                   
})

.catch((error)=> {
    alert("Une errreur est survenue")
})

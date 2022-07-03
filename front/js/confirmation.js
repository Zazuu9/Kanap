const idCommande = new URL(location.href).searchParams.get('id');
console.log(idCommande);

let selectionOrderId = document.getElementById("orderId");
selectionOrderId.innerHTML = idCommande;

localStorage.clear()

const loadProducts = () => {
    const searchText = document.getElementById("input-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayProducts(data.data))
}

const displayProducts = (products) => {
    console.log(products);
    const productsContainer = document.getElementById("products-container");
    for(const product of products){
        const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 p-3">
    <img src="${product.image}" class="card-img-top w-50 mx-auto">
    <div class="card-body">
      <h3 class="card-title">${product.phone_name}</h3>
      <h4 class="card-text">${product.brand}</h4>
    </div>
    </div>
    `;
    productsContainer.appendChild(div);
    }
}
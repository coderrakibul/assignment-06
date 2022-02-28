const loadProducts = () => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.textContent = "";
    const searchText = document.getElementById("input-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayProducts(data.data))
}
loadProducts()
const displayProducts = (products) => {
    document.getElementById("input-field").value = "";
    const productsContainer = document.getElementById("products-container");
    for(const product of products){
        const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 p-3">
    <img src="${product.image}" class="card-img-top w-50 mx-auto">
    <div class="card-body d-flex justify-content-between">
      <div>
      <h3 class="card-title">${product.phone_name}</h3>
      <h4 class="card-text">${product.brand}</h4>
      </div>
      <div>
      <button onclick="loadMoreInfo('${product.slug}')" class="btn btn-primary mx-auto">More Details</button>
      </div>
    </div>
    </div>
    
    `;
    productsContainer.appendChild(div);
    }
}


const loadMoreInfo = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayMoreInfo(data.data))
}

const displayMoreInfo = info => {
    console.log(info);
    const moreInfoContainer = document.getElementById("more-info-container");
    moreInfoContainer.innerHTML = `
    <div class="">
    <img class="w-50" src="${info.image}" alt="">
    <h3>Name: ${info.name}</h3>
    <h3>Brand: ${info.brand}</h3>
    <h3>Release Date: ${info.releaseDate}</h3>
    <h3>Memory: ${info.mainFeatures.memory}</h3>
    <h3>Chipset: ${info.mainFeatures.chipSet}</h3>
  </div>
    `
}
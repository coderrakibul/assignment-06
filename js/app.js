// load products and fetch API
const loadProducts = () => {
    const productsContainer = document.getElementById("products-container");
    const moreInfoContainer = document.getElementById("more-info-container");
    productsContainer.textContent = "";
    moreInfoContainer.textContent = "";
    const searchText = document.getElementById("input-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data == false) {
                document.getElementById("error-message").style.display = "block";
            }
            else {
                displayProducts(data.data);
                document.getElementById("error-message").style.display = "none";
            }
        })
    document.getElementById("input-field").value = "";
}


// show all products in UI
const displayProducts = (products) => {
    document.getElementById("input-field").value = "";
    const productsContainer = document.getElementById("products-container");
    const products20 = products.slice(0, 20);
    for (const product of products20) {
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
      <div class="">
      <button onclick="loadMoreInfo('${product.slug}')" class="btn btn-primary">Details</button>
      </div>
    </div>
    </div>
    
    `;
        productsContainer.appendChild(div);
    }
}

// call API and load more info data
const loadMoreInfo = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMoreInfo(data.data))
}

// show more info in UI
const displayMoreInfo = info => {
    const moreInfoContainer = document.getElementById("more-info-container");
    moreInfoContainer.innerHTML = `
    <div class="card col-12 col-lg-6 mx-auto shadow">
    <div class=" mx-auto mt-3">
    <img src="${info.image}" class="card-img-top img-fluid" alt="">
    </div>
    <div class="card-body">
      <h2 class="card-title">Name: ${info.name}</h2>
      <h3 class="card-text">Brand: ${info.brand}</h3>
      <h3 class="card-text">Release Date: ${info.releaseDate ? info.releaseDate : "No release date found"}</h3>
      <h3 class="card-text">Memory: ${info.mainFeatures.memory}</h3>
      <h3 class="card-text">Chipset: ${info.mainFeatures.chipSet}</h3>
      <div class="mt-4">
      <h1>Sensors: </h1>
      <h3 id="sensor-area" class="card-text"> </h3>
      </div>
      <h1 class="card-text mt-4">Others: </h1>
      <h3 class="card-text">Bluetooth: ${info?.others?.Bluetooth}</h3>
      <h3 class="card-text">GPS: ${info?.others?.GPS}</h3>
      <h3 class="card-text">NFC: ${info?.others?.NFC}</h3>
      <h3 class="card-text">Radio: ${info?.others?.Radio}</h3>
      <h3 class="card-text">USB: ${info?.others?.USB}</h3>
      <h3 class="card-text">WLAN: ${info?.others?.WLAN}</h3>
    </div>
    </div>
    `;

    // sensors information
    const sensorArea = document.getElementById("sensor-area");
    const getSensor = info.mainFeatures.sensors;
    const sensorText = getSensor.join(", ");
    sensorArea.innerText = sensorText;

}

async function displayProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      result.forEach((p) => {
        const product = `
        <div class="product-card">
            <img src="${p.image}" alt="" />
            <div class="details">
              <p class="p-name">${p.name}</p>
              <p class="p-description">${p.description}</p>
              <p class="p-price">$${p.price}</p>
            </div>
            <button>Details</button>
          </div>`;
        document.querySelector(".all-product").innerHTML += product;
      });
    } else {
      alert(`Error: ${response.status}`);
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
}
displayProducts();

document
  .getElementById("addproductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const data = {
      image,
      name,
      description,
      price,
    };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product Added!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
  });

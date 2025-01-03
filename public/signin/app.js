document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    username,
    password,
  };

  try {
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      if (result.role == "admin") {
        window.location.href = "/admin/addproduct";
        return;
      }
      window.location.href = "/";
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
});

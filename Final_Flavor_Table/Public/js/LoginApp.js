const form = document.getElementById("register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch("/connect/logging", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); 
      alert("🎉 logged successfully! Redirecting to Random Page...");
      window.location.href = "Random.html";
    } 
    else {
      alert("👾 Logging failed: " + (data.message || "Something went wrong"));
    }
  } 
  catch (err) {
    alert("👾 Error In Logged.");
    console.error(err);
  }
});

async function fetchProtectedData() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("👾 No token found. User might not be logged in.");
    return;
  }
  try {
    const res = await fetch("/protected-route", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Protected data:", data);
    } else {
      console.warn("👾 Failed to fetch protected data.");
    }
  } 
  catch (err) {
    console.error("👾 Error fetching protected data:", err);
  }
}

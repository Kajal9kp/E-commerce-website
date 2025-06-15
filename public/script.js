document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const emailInput = document.getElementById("emailInput");

  submitBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        emailInput.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const donationForm = document.getElementById("food-donation-form");
  const donationsList = document.getElementById("donations-list");

  // Fetch and display donations
  function fetchDonations() {
    fetch("/api/donations")
      .then((response) => response.json())
      .then((donations) => {
        donationsList.innerHTML = "";
        donations.forEach((donation) => {
          const li = document.createElement("li");
          li.className = "donation-item";
          li.innerHTML = `
                        <h3>${donation.foodItem}</h3>
                        <p>Quantity: ${donation.quantity}</p>
                        <p>Donor: ${donation.donorName}</p>
                        <p>Location: ${donation.location}</p>
                        <p>Expires: ${new Date(
                          donation.expirationDate
                        ).toLocaleDateString()}</p>
                    `;
          donationsList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching donations:", error));
  }

  // Submit donation form
  donationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      foodItem: document.getElementById("foodItem").value,
      quantity: document.getElementById("quantity").value,
      donorName: document.getElementById("donorName").value,
      location: document.getElementById("location").value,
      expirationDate: document.getElementById("expirationDate").value,
    };

    fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        donationForm.reset();
        fetchDonations();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Initial fetch of donations
  fetchDonations();
});

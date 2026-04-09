function calculateBudget() {
  // Inputs lena
  let city = document.getElementById("city").value.trim();
  let days = Number(document.getElementById("days").value);
  let people = Number(document.getElementById("people").value);

  let result = document.getElementById("result");

  // 🔴 Validation
  if (city === "" || days <= 0 || people <= 0) {
    result.innerText = "⚠️ Please enter valid details";
    result.style.color = "red";
    return;
  }

  // 💰 Cost logic (per person per day)
  let hotelCost = 1500;
  let foodCost = 500;
  let transportCost = 300;

  // Total calculation
  let totalCost = (hotelCost + foodCost + transportCost) * days * people;

  // 🎯 Budget category
  let category = "";
  if (totalCost < 5000) {
    category = "Low Budget 🟢";
  } else if (totalCost < 15000) {
    category = "Medium Budget 🟡";
  } else {
    category = "High Budget ";
  }

  // 🧾 Output show
  result.innerHTML = `
    📍 City: ${city} <br>
    👥 People: ${people} <br>
    📅 Days: ${days} <br><br>
    💰 Total Estimated Cost: ₹${totalCost} <br>
    📊 Budget Type: ${category}
  `;

  result.style.color = "green";

  // 💾 LocalStorage (future use ke liye)
  localStorage.setItem(
    "travelBudget",
    JSON.stringify({
      city: city,
      days: days,
      people: people,
      totalCost: totalCost,
    }),
  );
}

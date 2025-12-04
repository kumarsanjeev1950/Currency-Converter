const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultBox = document.getElementById("result");

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);

    currencies.forEach((currency) => {
      fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
      toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    fromSelect.value = "USD";
    toSelect.value = "EUR";
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount) {
    resultBox.innerHTML = "Please enter an amount.";
    resultBox.classList.add("show");
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);

      resultBox.innerHTML = `${amount} ${from} = <br><strong>${converted} ${to}</strong>`;
      resultBox.classList.add("show");
    });
}

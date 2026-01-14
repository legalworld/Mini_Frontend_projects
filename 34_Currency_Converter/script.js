const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrency);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrency() {
  // from this end point we will fetch currencies...
  // https://open.er-api.com/v6/latest/USD

  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    method: "GET",
  });

  const data = await response.json();

  // --------------------------------------------
  // debug code
  // console.log(data);
  // --------------------------------------------

  const currencyOptions = Object.keys(data.rates);

  //  console.log(currencyOptions);
  // currencyOptions is an array, that's why we use forEach method with it...

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(event) {
  // because the eventListener is on form element, we will use event.preventDefault()
  event.preventDefault();

  // amount is a string, cause it's coming from an input... that's why u need to parse it... here float make sense...
  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  // edge case
  if (amount < 0) {
    alert("please enter a valid amount");
    return;
  }

  const response = await fetch(
    `https://open.er-api.com/v6/latest/${fromCurrencyValue}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}

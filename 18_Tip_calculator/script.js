const generateBillButton = document.querySelector(".generate-bill");
const billAmount = document.querySelector(".bill-amount");
const discountPercentage = document.querySelector(".discount-percentage");
const tipPercentage = document.querySelector(".tip-percentage");
const noOfCustomers = document.querySelector(".no-of-customers");
const totalTipPaid = document.querySelector(".total-tip-paid");
const totalAmountToPay = document.querySelector(".total-amount-to-pay");
const totalTipPercentageValue = document.querySelector(".tip-value");
const discountPercentageValue = document.querySelector(".discount-value");
const totalNoOfCustomersValue = document.querySelector(
  ".no-of-customers-value"
);
const eachCustomerToPay = document.querySelector(".each-customer-to-pay");

function calculateBill() {
  const bill = Number(billAmount.value);
  const discount = Number(discountPercentage.value);
  const tip = Number(tipPercentage.value);
  const customers = Number(noOfCustomers.value);

  if (!bill || bill <= 0) return;

  const validCustomers = customers > 0 ? customers : 1;

  const discountedBill = bill - (discount * bill) / 100;
  const tipAmount = (tip * discountedBill) / 100;
  const totalBill = discountedBill + tipAmount;

  const eachCustomerToPayAmount = totalBill / validCustomers;

  totalTipPaid.textContent = tipAmount.toFixed(2);
  totalAmountToPay.textContent = totalBill.toFixed(2);
  totalTipPercentageValue.textContent = `${tip}%`;
  discountPercentageValue.textContent = `${discount}%`;
  totalNoOfCustomersValue.textContent = validCustomers;
  eachCustomerToPay.textContent = eachCustomerToPayAmount.toFixed(2);
}

generateBillButton.addEventListener("click", calculateBill);

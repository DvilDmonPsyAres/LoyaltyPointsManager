
function checkNameValues() {
  const product_name = document.getElementById('product_name').value;
  if(product_name.length > 0 && product_name.length < 150) {
    console.log('testing name listener');
    return true;
  }
  return false
}

function checkDescriptionValues() {
  const description = document.getElementById('description').value;
  if(description.length > 0 && description.length < 255) {
    console.log('testing description listener');
    return true;
  }
  return false
}

function checkPriceValues() {
  const price = document.getElementById('price').value;
  if(price > 0 && price < 10000) {
    console.log('testing price listener');
    return true;
  }
  return false
}

function checkLoyaltyPointsValues() {
  const loyalty_points = document.getElementById('loyalty_points').value;
  if(loyalty_points > 0 && loyalty_points < 51) {
    console.log('testing loyalty_points listener');
    return true;
  }
  return false
}

function checkPriceInPointsValues() {
  const price_in_points = document.getElementById('price_in_points').value;
  if(price_in_points > 19 && price_in_points < 251) {
    console.log('testing price_in_points listener');
    return true;
  }
  return false
}

// Add an event listener to the 'product_name' input element
const productNameInput = document.getElementById('product_name');
productNameInput.addEventListener('input', checkNameValues);
//Add event listener to description input
const productDescriptionInput = document.getElementById('description');
productDescriptionInput.addEventListener('input', checkDescriptionValues);
//Add event listener to price input
const productPriceInput = document.getElementById('price');
productPriceInput.addEventListener('input', checkPriceValues);
//Add event listener to loyalty input
const productLoyaltyPointsInput = document.getElementById('loyalty_points');
productLoyaltyPointsInput.addEventListener('input', checkLoyaltyPointsValues);
//Add event listener to price in loyalty input
const productPriceInPointsInput = document.getElementById('price_in_points');
productPriceInPointsInput.addEventListener('input', checkPriceInPointsValues);

// const button = document.getElementById("submit-form");
// button.addEventListener('click', function(e) {
//   // e.preventDefault(); // Prevent form submission
//   if (
//     checkNameValues() &&
//     checkDescriptionValues() &&
//     checkPriceValues() &&
//     checkLoyaltyPointsValues() &&
//     checkPriceInPointsValues()
//   ) {
//     button.removeAttribute('disabled', '');
//   } else {
//     button.setAttribute('disabled', '');
//   }
// });

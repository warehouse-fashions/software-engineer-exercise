let resultsConfig;
let products;
fetch("data/recommendations.json")
  .then(response => {
    return response.json();
  })
  .then(results => {
    console.log(results);
    resultsConfig = results;
  });

fetch("data/product.json")
  .then(response => {
    return response.json();
  })
  .then(results => {
    products = results;
    products.data.map(el => {
      el.currencySign = el.currency == "GBP" ? "£" : el.currency;
    });
    console.log(results);
  });

function generateSearchResults(target, config) {}

function hitTemplate(product) {
  let price = product.price ? product.price : product.variants[0].price;
  let template = `<div class="hit">
                    <ul>
                      <li><img class="productPhoto" src="${
                        product.image_groups[0].images[0].link
                      }"/></li>
                      <li class="productName">${product.name}</li>
                      <li class="productPrice">${product.currencySign +
                        " " +
                        price}</li>
                    </ul>
                  </div>`;
  return template;
}

// to apply for custom currencies
function getCurrencySign(currency) {
  let currencySign;
  return fetch("data/commonCurrency.json")
    .then(response => {
      return response.json();
    })
    .then(results => {
      currencySign = results[currency].symbol;
      return currencySign;
    });
}

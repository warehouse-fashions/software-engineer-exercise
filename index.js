let app = document.querySelector('.container')
app.innerHTML = `
    <h1 class="app-title">we recommend</h1>

    `;

fetch('data/recommendations.json')
    .then(function(res) {
        console.log('Response:', res)
        return res.json();
    })
    .then(function(data) {
            console.log(data.hits)
            let box = document.createElement('div')
            box.classList.add('boxy')
            app.appendChild(box)

            let innerbox = document.createElement('div')
            innerbox.classList.add('inner-boxy')
            box.appendChild(innerbox)

            innerbox.innerHTML = `${data.hits.map(function(product){ 
            if(product.image){
                return `
                <div class="item">
                <img class="item-image" src="${product.image['link']}">
                <div class="prod-info-container">
                <p class="prod-title">${product.product_name}<p>
                <p class="prod-price">£${product.price}.00</p>
                </div>
                </div>
                ` 
            }
        
        }).join('')}`

        let item = document.querySelector('.item');
        innerbox.appendChild(item);

    })






    // next add the title and the price to the items div
    // create two divs, one for title other for price.app-title
    // append these to item as children of item
    // position below image (display: flex; flex-direction: column)
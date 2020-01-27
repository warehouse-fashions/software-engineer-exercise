let app = document.querySelector('.container');


fetch('data/recommendations.json')
    .then(function(res) {
        console.log('Response:', res)
        return res.json();
    })
    .then(function(data) {
            console.log(data.hits)
            let box = document.createElement('div');
            box.classList.add('boxy')
            app.appendChild(box)
            let innerbox = document.createElement('div');
            innerbox.classList.add('inner-boxy')
            box.appendChild(innerbox)

            innerbox.innerHTML = `${data.hits.map(function(product){ 
            if(product.image){
                return `
                <div class="item">
                <img class="item-image" src="${product.image['link']}">
                </div>
                ` 
            }
        
        }).join('')}`

        let item = document.querySelector('.item');
        innerbox.appendChild(item);

    })




app.innerHTML = `
    <h1 class="app-title">we recommend</h1>

    `;
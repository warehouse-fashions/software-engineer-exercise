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
        
        let productsImage = document.addEventListener('click', function(e){
            if (e.target && e.target.classList=="item-image") {

                fetch('data/product.json')
                .then(function(res) {
                    console.log('Response:', res)
                    return res.json();
                })

                .catch(function(error) {
                    throw new Error(error);
                })

                .then(function(data2){
                   const dataArray = Object.values(data2.data)
                   console.log(dataArray)
                   dataArray.forEach(function(name){
                       console.log(name.name)
                   })
                })
                
            }
        })
        
    })

    

    
    // for(var i = 0; i < data2.data.length; i++){
    //     if(data.hits[i].product_name === data2.data[i].name){
    //         console.log(data.hits[i].product_name)
    //     }

    // }
  
//  modal itself 
    // let modalcontainer = document.createElement('div')
    // modalcontainer.classList.add('modal-container')
    // app.appendChild(modalcontainer)
    // modalcontainer.innerHTML = `

    //     <div class="modal-grid">
    //     <div class="modal-header">

    //         <div class="modal-title">Example Modal</div>
    //         <div class="close-button">&times;</div>
    //     </div>

    //     <div class="modal-body">
    //     this is where the info for the product will go
    //     </div>

    //     </div>
        
        
    //     `



    // next add the title and the price to the items div
    // create two divs, one for title other for price.app-title
    // append these to item as children of item
    // position below image (display: flex; flex-direction: column)
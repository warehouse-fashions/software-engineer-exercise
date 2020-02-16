# Warehouse Software Engineering Task

This is a copy of a Warehouse product recommendations component consisting of an index page and a modal element to display product detail.

## Getting Started

Use the clone button to download the source code. Enter the following commands in the CLI:

<-- To install the http server --> $ npm i  

<-- To run the server --> $ http-server

<-- Then navigate to http://localhost:8080/ in your browser -->

## Technologies Used

JavaScript

HTML 5

CSS3

## Development Process

I decided to make the component in pure JavaScript because I wanted to improve my skills working in the DOM without any library or framework. 

The first challenge was importing the JSON files into my app.js file - I have done this by installing a http server so that I could do a fetch request to the JSON file.

The next biggest challenge was in navigating the JSON files which contain a large amount of multi-layered data with some inconsistencies. I overcame some of these issues by doing a check on both files - for example when displaying an image I would check the recommendations file for an image, and then if there was not one there then I would use one from the products file instead: 
    
    
    app.innerHTML = recommendations.hits.map((elem, i) => 
      
    <div id=${i} class="items">
      ${product.data.map(item => item.name === elem.product_name ? 
    
      <img id=${i} src=${elem.image ? elem.image.link : item.image_groups[0].images[0].link}
    : '').join('')}
      <div> 
        <h2>${elem.image ? elem.image.title : elem.product_name}</h2>
        <p>£${elem.price}.00</p>
      </div>
    </div>
    , ).join('')


   The modal was also an interesting challenge because I needed to target each item by its index and then target the index of each image within the image array of each item. I was happy with the function I wrote which deals with both the forward and back arrows that the user is able to click on:

```
    function updateImage(product, recommendations, carouselButtons, carouselImage) {
    //  display default product image
    const currentImage = product.data.map(pro => 
      recommendations.hits.map(rec => rec.product_name === pro.name ? 
        pro.image_groups[0].images : ''))
    
    // map out each array of item images to it's item index
    const image = currentImage.map((current, i) => current[i])

    let j = 0
    carouselButtons.forEach(button => button.addEventListener('click', function() {
      if (event.target.id === 'right-button') {

        // target the length of the array of images on each item by using the id of each array of images
        if (j < image[carouselImage.id].length - 1) {
          j++
          // replace the image source with the next image in the array of images as the user clicks through
          carouselImage.src = image[carouselImage.id][j].link
        }
      }

      // as above to go back down through the array of images 
      if (event.target.id === 'left-button') {
        if (j > 0) {
          j--
          // replace the image source with the previous image in the array of images as the user clicks through
          carouselImage.src = image[carouselImage.id][j].link
        }
      }

    }))
  }

```

Design-wise, I stuck to a simple and clean design, attempting to copy the example given. As a future improvement, I think I could add some simple transition animations to the images on the modal. 
# Warehouse Software Engineer Exercise

### Requirements

In this exercise we would like you to build a web component similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The component you build should display images, prices be able to link to a product modal/lightbox.

The product modal/lightbox should display information on the product clicked on similar to this [screenshot](product-modal-screenshot.png) making sure to include an image carousel, product name, price, colour swatch and size variations. All product information can be found in the following products [JSON](data/product.json) provided. Creativity is accepted but do not alter the JSONs provided.

* Responsive
* Reusable code

</hr>

### Technologies used
HTML | SCSS | JavaScript (ES6) | React | Webpack | Bulma

### Build
- Built using React
- Dependancies - NPM/YARN (from the project root ```$ npm install ``` or ```$ yarn``` )
- Displays the product name and price
- Used Bulma to make the app responsive

Due to the restricted time I was unable to complete all tasks as requested in the brief, one of the reasons was because I was unable to successfully render the image link.

My approach to build the product modal would be to use the modal component in Bulma which would render the data from the product.json file using the same method used to render the recommendations.json file. My aim was to use Flickity to make the carousel for the images.

### Challenges
I was unable to successfully display the images as this was in a nested array/object. My approach was to use ``` <img src={data.image.link} /> ``` however this broke the app, I also tried to use map again to iterate over the image array and this was unsuccessful.

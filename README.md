# Warehouse Software Engineer Exercise

In this exercise we would like you to build a web component similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The component you build should display images, prices be able to link to a product modal/lightbox.

The product modal/lightbox should display information on the product clicked on similar to this [screenshot](product-modal-screenshot.png) making sure to include an image carousel, product name, price, colour swatch and size variations. All product information can be found in the following products [JSON](data/product.json) provided. Creativity is accepted but do not alter the JSONs provided.

### Requirements

- Responsive
- Reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

### UPDATE

to run the local server - go with:

npm run server

### Summary

I've decided to use vue.js because I think it suits perfectly for this kind of exercise.
App is built with 2 components and 1 main app node,
Single file app so no webpack needed.
I've also used http-server for live-server during development

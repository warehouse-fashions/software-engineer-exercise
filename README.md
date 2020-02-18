# Warehouse Software Engineer Exercise

In this exercise we would like you to build a web component similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The component you build should display images, prices be able to link to a product modal/lightbox.

The product modal/lightbox should display information on the product clicked on similar to this [screenshot](product-modal-screenshot.png) making sure to include an image carousel, product name, price, colour swatch and size variations. All product information can be found in the following products [JSON](data/product.json) provided. Creativity is accepted but do not alter the JSONs provided.

### Requirements
* Responsive
* Reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

## Live Demo
[https://software-engineer-exercise.herokuapp.com/](https://software-engineer-exercise.herokuapp.com/)

## Considerations

- Built on react
- Using react-slick for carousel, Material-ui for icons and CardMedia, react-spring for animated fade
- Main component '/containers/WarehouseCarousel' takes data as a prop to allow for different data to be passed.
- 'WarehouseCarousel' also takes all extra props passed to it and applies it to its parent div (so can add extra classes and styling to parent)

## Things to change / Cleanup

- Need to fix same modal data showing when modal is clicked as modal is closing.(e.g. when clicking another carousel item when current modal is closing old data persists)
- Implement button functionality to size and colour boxes and handle selected button state that also holds its value.
- add loading spinner when modal is opening 
- allow extra props to be passed to main 'WarehouseCarousel' component. To be able to enable/ disable/ apply custom content. Like being able to change the 'recommendations' title through a prop
- remove react-slick as carousel API - build react specific carousel component that doesn't use JQuery
- need to disable interaction with main carousel once modal is open
- responsively add 'additional information' to modal card. Might need a 'additional info' toggle that expands on mobile

## Available Scripts

In the project directory, you can run:

### `npm install`

Then...

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

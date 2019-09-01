# Warehouse Software Engineer Exercise

In this exercise we would like you to build a web component similar to this [screenshot](recommendations-screenshot.png) using the recommendations [JSON](data/recommendations.json) provided. The component you build should display images, prices be able to link to a product modal/lightbox.

The product modal/lightbox should display information on the product clicked on similar to this [screenshot](product-modal-screenshot.png) making sure to include an image carousel, product name, price, colour swatch and size variations. All product information can be found in the following products [JSON](data/product.json) provided. Creativity is accepted but do not alter the JSONs provided.

### Requirements
* Responsive
* Reusable code

Please fork this repository and commit your changes for review.

Amend this Readme in your forked repo and use your commits to outline the component you have created and the decisions that you have made, including any information required for how to run your component. When complete please raise a Pull Request back into master branch for review.

### Technologies Used
This is a node application using React and Express with the following:

* `React.js`
* `HTML`
* `JavaScript`
* `CSS`
* `nodemon` - For dev, automatically restarts the server on change
* `npm-run-all` - Allows me to run multiple npm scripts at once
* `react-responsive-modal` - For the lightbox
* `slick-carousel` - For the carousels

### Installation
Run the following commands in your terminal:

* `npm install` - Install node modules. I didn't commit them in the end as the diff was too large for code review.
* `npm run dev` - This runs both the server and React application.

Next, go to `http://localhost:3000/` in your browser.

### Requirements
#### Responsive
The carousel and lightbox are both responsive. This has been achieved by either configuring the component settings (eg Slick) or using simple CSS (Lightbox contents - media query).

#### Reusable
In order to make this code re-usable, my intention was to approach this by having the main container fetch the data and feed this in to the child-components.

However, I made a faux-pas by having all of the logic in the Product Carousel component and unfortunately ran out of time to refactor this part.

My approach would have been:

* _ProductRecommendations_
  * _ProductCarousel_
  * _Lightbox_
    * _ProductDetailsView_

* `ProductRecommendations` - Container, fetches data and passes in to child-components.
* `ProductCarousel` - Re-usable product carousel that expects default props. Recommendations data would be fed into component which itself imports the `ProductCard` for each slide.
* `Lightbox` - Standard Lightbox that accepts `children` for main content. Can pass close event back up to parent container.
* `ProductDetailsView` - Passed in as `children` of `Lightbox`. Prop would be selected product data.

### Challenges
#### Carousel's didn't play ball
I had great difficulty trying to find a simple react carousel module that would achieve what I required:
* Simple
* Responsive
* Multi-slide
* Customisable

Initially I used `pure-react-carousel` as it seemed to be the cleaner option with reasonable documentation. 

##### Problem # 1
It was only once I'd implemented it that I realised the responsive aspect of the module was lacking. I tried to combat this by adding an events listener for if the user resizes the window and compare to my defined breakpoints. Based on this I'd determine how many slides to show.

This was already feeling wrong so when I decided to add some throttling to limit executions (using `lodash.throttle` - to 5 times per second), I knew it was time to use another.

Enter Slick.

##### Problem # 2
Another reason that I pulled out `pure-react-carousel` and introduced `Slick` was because of the way click events are handled in the carousel modules.

In order to trigger the lightbox that would display my product data, I needed to send the click event back to the parent.

However, the carousel (this was in both modules) was unable to distinguish between a drag and click event. Upon dragging the carousel to see my next products, the `mousedownmove` isn't detected so the lightbox opens.

I noticed in the Slick documentation there two properties that might allow me to work around this issue:
* `beforeChange`
* `afterChange`

Following a bit of searching, I came across a suggestion in a reported `react-slick` issue and was able to use this to detect if the user has dragged before handling the click event.

#### Product Data and View
Working with the data and producing the view for the content of the Lightbox was troublesome for a few reasons:
1. Variants are multi-dimensional
2. The structure of the variants data
3. Trying to obtain the full product data from the variant id

The product in the carousel is a variant with only the variant id.

The information in the Lightbox is the full product, initially showing:
* High res images of selected colour variant
* All colour variant swatches
* Sizes for the selected variant

With the variant id, I can, with some work get most of the data I need to display.

However, I feel this could be done better and one important part is incomplete - handling the change of variant.

At present, the swatch image does not contain the variant id but the color id is more easily attainable. But, I can't obtain the variant id from the color id.

#### Outstanding / Improvements

* Aforementioned refactor for container pattern
* Clean up data handling
* Better commenting
* Better image placeholder
* Complete styling of ProductDetails (Lightbox content)
* Handle variant select in ProductDetails (Lightbox content)
* Font styling isn't a perfect match for design
* A nice little component for the price
  * Handle currency symbol and format from given currency code
  * Handling both Retail & Sale price - currently just selling price 
* Navigational arrows for carousel components
* Introduce Cors - using images from a secondary domain
* SCSS instead of CSS
* Proper linting
* Visual feedback - placeholders for images to preserve layout eg. swatches


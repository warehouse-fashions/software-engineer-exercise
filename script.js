const hit = Vue.component("hit", {
  props: ["hitProps", "mainPhoto"],
  data: function() {
    return {
      currencySymbol: ""
    };
  },
  template: `<dl class="hit">
                <div><img class="productPhoto" v-bind:src="mainPhoto"/></div>
                <dt class="productName">{{hitProps.product_name}}</dt>
                <dd class="productPrice">{{hitProps.currency == 'GBP' ? "£" : this.currencySymbol}} {{hitProps.price}}</dd>
            </dl>`,
  methods: {
    currencies: function() {
      fetch("data/commonCurrency.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          this.currencySymbol = results[this.hitProps.currency].symbol;
        });
    }
  },
  mounted: function() {
    this.hitProps.currency == "GBP"
      ? (this.currencySymbol = "£")
      : this.currencies();
  }
});

const lightbox = Vue.component("lightbox", {
  props: ["productInfo", "productVariant"],
  data: function() {
    return {
      currencySymbol: "",
      currentVariant: this.productVariant,
      colors: [],
      sizes: [],
      fullPhotos: [],
      photoIndex: 0
    };
  },
  template: `<div v-on:click.self="$emit('close')" class="modal">
              <div class="modalContainer">
                  <span class="modalClose" v-on:click="$emit('close')">
                    <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2   51.5,51.1 79.6,23 "/></svg>
                  </span>
                  <div class="lightboxCarousel">
                  <a v-html="currentPhoto.outerHTML"></a>
                    <span @click="photoIndex == 0 ? photoIndex = fullPhotos.length - 1 : photoIndex--" class="navigationButton previousButton"> <?xml version="1.0" ?><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 6" id="Layer_6"><path d="M12.61,63.79l-1.22-1.58L50.37,32l-39-30.21L12.61.21l40,31a1,1,0,0,1,0,1.58Z"/></g></svg>
                    </span>
                    <span @click="photoIndex == fullPhotos.length -1 ? photoIndex = 0 : photoIndex++" class="navigationButton nextButton"> <?xml version="1.0" ?><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 6" id="Layer_6"><path d="M12.61,63.79l-1.22-1.58L50.37,32l-39-30.21L12.61.21l40,31a1,1,0,0,1,0,1.58Z"/></g></svg>
                    </span>
                  </div>
                  <div class="lightboxDetails">
                    <dl>
                      <dt>{{productInfo.name}}</dt>
                      <dd class="productPrice">{{this.currencySymbol}} {{productInfo.price}}</dd>
                      <ul class='variant'><li v-bind:class="{selectedVariant: currentColor == color.value}" @click="changeColor(color.value)" class=" colorVariant" v-for="color in colors" ><img :src="color.image" /></li></ul>
                      <ul class='variant'><li v-bind:class="{selectedVariant: currentSize == size.value}" @click="changeSize(size.value)" class=" sizeVariant" v-for="size in sizes" > {{size.name}} </li></ul>
                    </dl>
                  </div>
              </div>
            </div>`,
  computed: {
    currentPhoto: function() {
      if (this.fullPhotos.length == 0) {
        return myApp.failPhotoHolder;
      }
      return this.fullPhotos[this.photoIndex].preload;
    },
    currentColor: function() {
      return this.currentVariant.substr(0, 2);
    },
    currentSize: function() {
      return this.currentVariant.substr(2, 4);
    }
  },
  methods: {
    currencies: function() {
      return fetch("data/commonCurrency.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          this.currencySymbol = results[this.productInfo.currency].symbol;
        });
    },
    getVariants: function() {
      this.productInfo.variation_attributes[0].values.map(el => {
        let color = el;
        this.productInfo.image_groups.map(groups => {
          if (
            groups.view_type == "swatch" &&
            groups.variation_value == el.value
          ) {
            color.image = groups.images[0].link;
          }
        });
        this.colors.push(color);
      });

      this.productInfo.variation_attributes[1].values.map(el =>
        this.sizes.push(el)
      );
    },
    changeColor: function(color) {
      this.currentVariant = color + this.currentSize;
      this.getFullPhotos(this.currentVariant.substr(0, 2));
    },
    changeSize: function(size) {
      this.currentVariant = this.currentColor + size;
    },
    getFullPhotos: function(variant) {
      let photos = [];
      this.productInfo.image_groups.map(groups => {
        if (groups.view_type == "hi-res" && groups.variation_value == variant) {
          photos = groups.images;
          photos.map(el => {
            el.preload = new Image();
            el.preload.src = el.link;
          });
        }
      });
      this.fullPhotos = photos;
      myApp.loadingFlag = false;
    }
  },
  mounted: function() {
    this.currencies();
    this.getVariants();
    this.getFullPhotos(this.productVariant.substr(0, 2));
  }
});

var myApp = new Vue({
  el: "#resultsApp",
  components: { hit },
  data: {
    productShowFlag: false,
    errorFlag: false,
    loadingFlag: true,
    products: [],
    recommendations: [],
    selectedProduct: null,
    selectedVariant: null,
    failPhotoHolder: "data/no_image_available.jpg",
    randomFour: []
  },
  template: ` <div>
                <h1 class="header">WE RECOMMEND</h1>
                <div class="resultsWrapper">
                  <div v-if="loadingFlag" class="lds-ripple"><div></div><div></div></div>
                  <p v-if="errorFlag" class="alterText"> We couldn't load any results :( Sorry!</p>
                  <hit v-for="(hit, index) in randomFour" :hitProps="hit" :mainPhoto="hit.hasOwnProperty('image') ? hit.image.link : failPhotoHolder"  :key="hit.product_id" v-on:click.native="getProductDetails(hit.product_id)" />
                </div>
                <lightbox v-if="this.productShowFlag" :productInfo="this.selectedProduct" :productVariant="this.selectedVariant" v-on:close="closeModal"/>
              </div>
              `,
  computed: {},
  methods: {
    getRandomFour: function() {
      let rand = [];
      var arr = [];
      while (arr.length < 4) {
        var randomnumber = Math.floor(Math.random() * 24) + 1;
        if (arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
        rand.push(this.recommendations.hits[randomnumber]);
      }
      this.randomFour = rand;
      this.loadingFlag = false;
    },
    getProducts: function() {
      fetch("data/product.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          this.products = results;
          this.getRecommendations();
        });
    },
    getRecommendations: function() {
      fetch("data/recommendations.json")
        .then(response => {
          return response.json();
        })
        .then(results => {
          this.recommendations = results;
          this.getRandomFour();
        });
    },
    getProductDetails: function(id) {
      this.loadingFlag = true;
      let shortId = id.toString().substr(0, 6);
      let variant = id.toString().substr(6, 9);
      let holder = this.products.data.filter(el => el.id == shortId);
      this.selectedProduct = holder[0];
      this.selectedVariant = variant;
      this.productShowFlag = true;
    },
    closeModal: function() {
      this.productShowFlag = false;
    }
  },
  mounted: function() {
    this.getProducts();
  }
});

import {getCurrentPrice, getImagesForColor} from "./helpers";


describe('getImagesForColor', () => {
    test('it should get hi-res images for color', () => {
        const product = {
            image_groups: [
                {
                    images: 'NOT_THIS_ONES',
                    variation_value: 'currentColor',
                    view_type: "swatch"
                },
                {
                    images: 'THIS_ONES',
                    variation_value: 'currentColor',
                    view_type: "hi-res"
                }
            ],
        };
        expect(getImagesForColor(product, 'currentColor')).toEqual('THIS_ONES')
    });

    test('it should get images only for selected color', () => {
        const product = {
            image_groups: [
                {
                    images: 'NOT_THIS_ONES',
                    variation_value: "wrong-color",
                    view_type: "hi-res"
                },
                {
                    images: 'THIS_ONES',
                    variation_value: 'currentColor',
                    view_type: "hi-res"
                }
            ],
        };
        expect(getImagesForColor(product, 'currentColor')).toEqual('THIS_ONES')
    })
});


describe('getCurrentPrice', () => {
   test('it should return correct price', () => {
       const product = {
           variants: [
               {
                   price: "priceNotForThisSize",
                   variation_values: {
                       color: "currentColor",
                       size: "wrongSize"
                   }
               },
               {
                   price: "priceNotForThisColor",
                   variation_values: {
                       color: "wrongColor",
                       size: "currentSize"
                   }
               },
               {
                   price: "correctPrice",
                   variation_values: {
                       color: "currentColor",
                       size: "currentSize"
                   }
               }
           ]
       };
       expect(getCurrentPrice(product, "currentColor", "currentSize")).toEqual('correctPrice');
   });
   test("it should ignore size if not provided", () => {
       const product = {
           variants: [
               {
                   price: "priceNotForThisColor",
                   variation_values: {
                       color: "wrongColor",
                       size: "anySize"
                   }
               },
               {
                   price: "correctPrice",
                   variation_values: {
                       color: "currentColor",
                       size: "totallyDifferentSize"
                   }
               }
           ]
       };
       expect(getCurrentPrice(product, "currentColor", undefined)).toEqual('correctPrice')
   })
});


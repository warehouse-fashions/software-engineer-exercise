export function getImagesForColor(product, color) {
    return product.image_groups
                  .filter(({variation_value, view_type}) =>
                      view_type === 'hi-res' && variation_value === color)[0].images.slice(1)
}

export function getCurrentPrice(product, color, size) {
    const variantWithColor = product.variants.filter(({variation_values}) => color === variation_values.color);
    const variantWithSize = size ? variantWithColor.filter(({variation_values}) => size === variation_values.size) : variantWithColor;
    return variantWithSize[0].price;

}

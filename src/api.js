import products from "./data/product";
import recommendations from './data/recommendations'

export function getRecommendations() {
    return recommendations;
}

export function getProduct(productId) {
    for (let i = 0; i < products.data.length; i++) {
        const product = products.data[i];
        for (let j = 0; j < product.variants.length; j++) {
            const variant = product.variants[j];
            if (variant.product_id === productId) {
                return product;
            }
        }
    }
}

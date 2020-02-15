import React, {useState} from 'react';
import './App.css';
import {Modal} from "./Modal";
import {ProductListItem} from "./ProductListItem";
import {getProduct, getRecommendations} from "./api";


function App() {
    const [choosenProduct, setChoosenProduct] = useState(null);
    const [variationValue, setVariationValue] = useState('');

    const recommendations = getRecommendations();
    const setCurrentProduct = (productId) => {
        const newChoosenProduct = getProduct(productId);
        setChoosenProduct(newChoosenProduct);
        setVariationValue(newChoosenProduct.image_groups.filter(({view_type}) => view_type === 'hi-res')[0].variation_value);
    };

    return (
        <div className="app">
            <h1>We recommend</h1>
            <div className='recommended-container'>
            {recommendations.hits.map((product, i) => product.image ? (
                <ProductListItem key={i} onClick={() => setCurrentProduct(product.product_id)} product={product}/>
            ) : '')}
            </div>
            {choosenProduct ? <Modal onClose={() => setChoosenProduct(null)} product={choosenProduct} /> : ''}
        </div>
    );
}

export default App;

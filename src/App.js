import React, {useState} from 'react';
import './App.css';
import {Modal} from "./Modal";
import {ProductListItem} from "./ProductListItem";
import {getProduct, getRecommendations} from "./api";
import {ProductDetails} from "./ProductDetails";


function App() {
    const [choosenProduct, setChoosenProduct] = useState(null);

    const recommendations = getRecommendations();
    const setCurrentProduct = (productId) => {
        const newChoosenProduct = getProduct(productId);
        setChoosenProduct(newChoosenProduct);
    };

    return (
        <div className="app">
            <h1>We recommend</h1>
            <div className='recommended-container'>
            {recommendations.hits.map((product, i) => product.image ? (
                <ProductListItem key={i} onClick={() => setCurrentProduct(product.product_id)} product={product}/>
            ) : '')}
            </div>
            {choosenProduct ?
                <Modal onClose={() => setChoosenProduct(null)}  >
                    <ProductDetails product={choosenProduct} />
                </Modal>: ''}
        </div>
    );
}

export default App;

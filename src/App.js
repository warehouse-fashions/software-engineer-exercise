import React, {useState} from 'react';
import './App.css';
import recommendations from './data/recommendations'


function App() {

    const [choosenProduct, setChoosenProduct] = useState('');

    function onProductSelected(productId) {
        // tu znajdż produkt który ma variants z twoim productID i zapamiętaj jako choosenPoduct
        setChoosenProduct(choosenProduct);
    }

    return (
        <div className="App">
            <h1>We recommend</h1>
            {recommendations.hits.map((product, i) => product.image ? (
                <div key={i} onClick={() => setChoosenProduct(product.product_id)}>
                    <img src={product.image.link} alt={product.image.alt} title={product.image.title}/>
                    <p>{product.product_name}</p>
                    <p>£ {product.price}</p>
                </div>
            ) : '')}
            {choosenProduct ?
                <div className='modal' onClick={() => setChoosenProduct('')}>
                    <p>{choosenProduct}</p>
                </div> : ''}
        </div>
    );
}

export default App;

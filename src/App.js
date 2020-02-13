import React, {useState} from 'react';
import './App.css';
import recommendations from './data/recommendations'

function App() {

    const products = recommendations.hits.map(product => product);
    const [choosenProduct, setChoosenProduct] = useState('');

    function handleCLick(choosenProduct) {
        setChoosenProduct(choosenProduct);
        console.log(choosenProduct)
    }

    return (
        <div className="App">
            <h1>We recommend</h1>
            {products.map((product, i) => product.image ? (
                <div key={i} onClick={() => handleCLick(product.product_id)}>
                    <img src={product.image.link} alt={product.image.alt} title={product.image.title}/>
                    <p>{product.product_name}</p>
                    <p>£ {product.price}</p>
                </div>
                ) : '')}
        </div>
    );
}

export default App;

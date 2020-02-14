import React, {useState} from 'react';
import './App.css';
import recommendations from './data/recommendations'
import products from './data/product'


function getProduct(productId) {
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

function Color({value, image_groups}) {
    const {link, alt, title} = image_groups
        .filter(({view_type, variation_value}) => view_type === "swatch" && variation_value === value)[0].images[0];
    return (
        <img src={link} alt={alt} title={title}/>
    )
}

function Size({name, value}) {
    return (
        <div>{name}</div>
    )
}


function App() {

    const [choosenProduct, setChoosenProduct] = useState(null);
    const [variationValue, setVariationValue] = useState('');
    const [image, setImage] = useState(0);

    const setCurrentProduct = (productId) => {
        const newChoosenProduct = getProduct(productId);
        console.log("setting: ", newChoosenProduct);
        setChoosenProduct(newChoosenProduct);
        setVariationValue(newChoosenProduct.image_groups.filter(({view_type}) => view_type === 'hi-res')[0].variation_value);
    };


    return (
        <div className="App">
            <h1>We recommend</h1>
            {recommendations.hits.map((product, i) => product.image ? (
                <div key={i} onClick={() => setCurrentProduct(product.product_id)}>
                    <img src={product.image.link} alt={product.image.alt} title={product.image.title}/>
                    <p>{product.product_name}</p>
                    <p>{product.currency.replace(product.currency, '\u00A3')}<span>{product.price}</span></p>
                </div>
            ) : '')}
            {choosenProduct ?
                <div className='modal' onClick={() => setChoosenProduct(null)}>
                    <div className="carousel-container">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setImage(image === 0 ? choosenProduct.image_groups[0].images.length - 1 : image - 1)
                        }} className="left-button">
                            &lt;
                        </button>
                        <div className="carousel" style={{"marginLeft": `${-image * 50}vw`}}>
                            {choosenProduct.image_groups[0].images.slice(1).map(image => {
                                return (
                                    <div className="carouselContent">
                                        <img src={image.link} alt={image.alt} className='modal-img'/>
                                    </div> )})
                            }
                        </div>
                        <button onClick={(e) =>
                        {
                            e.preventDefault();
                            setImage(image === choosenProduct.image_groups[0].images.length - 1 ? 0 : image + 1)}
                        } className="right-button">
                            &gt;
                        </button>
                    </div>
                    <div className='modal-description'>
                        <h1>{choosenProduct.name}</h1>
                        <p>{choosenProduct.currency.replace(choosenProduct.currency, '\u00A3')}
                            <span>{choosenProduct.variants[0].price}</span></p>
                        <div>
                            {choosenProduct.variation_attributes.map(({id, name, values}) => (
                                <div>
                                    <div>{values.map(({name, value}) => {
                                            if (id === 'color') {
                                                return <Color value={value} image_groups={choosenProduct.image_groups}/>
                                            } else if (id === 'size') {
                                                return <Size name={name}/>
                                            } else {
                                                return '';
                                            }
                                        }
                                    )}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> : ''}
        </div>
    );
}

export default App;

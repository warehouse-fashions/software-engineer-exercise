import React, {useState} from 'react';
import './App.css';
import recommendations from './data/recommendations'
import products from './data/product'


function getProduct (productId) {
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


function Color ({value, image_groups}) {
    console.log(image_groups, value);
    const {link, alt, title} = image_groups
        .filter(({view_type, variation_value}) => view_type === "swatch" && variation_value === value)[0].images[0];
    return (
        <img src={link} alt={alt} title={title}/>
    )
}

function Size ({name, value}) {
    return (
        <div>{name}</div>
    )
}


function App() {

    const [choosenProduct, setChoosenProduct] = useState(null);
    const [variationValue, setVariationValue] = useState('');
    // const choosenProductObj = useProduct(choosenProduct)

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
                    <p>£ {product.price}</p>
                </div>
            ) : '')}
            {choosenProduct !== null ?
                <div className='modal' onClick={() => setChoosenProduct(null)}>
                    <h1>{choosenProduct.name}</h1>
                    <p>{choosenProduct.currency} <span>{choosenProduct.price}</span></p>
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
                        {choosenProduct.variation_attributes.filter(({id}) => id === 'color').map((color) => {
                            return ''
                        })}
                        {/*{choosenProductObj.variation_attributes[0].values.map((color) => {*/}
                        {/*    return (*/}
                        {/*        <div>*/}
                        {/*            {color.value}*/}
                        {/*            {choosenProductObj.image_groups[1].variation_value}*/}
                        {/*            <img src={choosenProductObj.image_groups[1].images[0].link} />*/}
                        {/*        </div>*/}
                        {/*    )*/}
                        {/*})}*/}
                        {/*{choosenProductObj.variation_attributes[1].values.map((size) => {*/}
                        {/*    return (*/}
                        {/*        <div>*/}
                        {/*            {size.name}*/}
                        {/*        </div>*/}
                        {/*    )*/}
                        {/*})}*/}
                    </div>
                    {choosenProduct.image_groups[0].images.map(image => {
                        return (<img src={image.link} className='modal-img' alt={image.alt}/>)
                    })}
                </div> : ''}
        </div>
    );
}

export default App;

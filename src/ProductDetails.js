import {Color} from "./Color";
import {Size} from "./Size";
import {Carousel} from "./Carousel";
import React, {useState} from "react";
import './ProductDetails.css'

const VARIANT_COMPONENTS = {
    'color': Color,
    'size': Size
};


export function ProductDetails({product}) {

    const [color, setColor] = useState(product.image_groups.filter(({view_type}) => view_type === 'hi-res')[0].variation_value);
    const [size, setSize] = useState('');
    const currentImages = product.image_groups
                                 .filter(({variation_value, view_type}) =>
                                     view_type === 'hi-res' && variation_value === color)[0].images.slice(1);
    const variantWithColor = product.variants.filter(({variation_values}) => color === variation_values.color);
    const variantWithSize = size ? variantWithColor.filter(({variation_values}) => size === variation_values.size) : variantWithColor;
    const isSelected = (id, value) => id === 'color'? value === color : value === size;

    return (
        <div className='product-details'>
            <div className="carousel-container">
                <Carousel images={currentImages}/>
            </div>
            <div className='description'>
                <h1>{product.name}</h1>
                <p>{product.currency.replace(product.currency, '\u00A3')}
                    <span>{variantWithSize[0].price}</span></p>
                {product.variation_attributes.map(({id, values}) => (
                    <div key={id} className={`variants variants-${id}`}>
                        {values.map((props) => {
                            const ValueComponent = VARIANT_COMPONENTS[id];
                            return <ValueComponent
                                {...props}
                                key={`${id}-${props.value}`}
                                isSelected={isSelected(id, props.value)}
                                image_groups={product.image_groups}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (id === 'color') {
                                        setColor(props.value)
                                    } else {
                                        setSize(props.value)
                                    }
                                }}/>
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

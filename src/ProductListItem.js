import React from "react";
import "./ProductListItem.css";

export function ProductListItem({onClick, product}) {
    return (
        <div onClick={onClick}>
            <img src={product.image.link} alt={product.image.alt} title={product.image.title}
                 className='recommended-image'/>
            <p className='recommended-name'>{product.product_name}</p>
            <p style={{"textAlign": "center"}}>
                {product.currency.replace(product.currency, '\u00A3')}
                <span>{product.price}</span>
            </p>
        </div>
    )
}

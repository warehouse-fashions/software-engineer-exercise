import React from "react";
import "./ProductListItem.css";

export function ProductListItem({onClick, product}) {
    return (
        <div onClick={onClick} className="product-list-item">
            <img src={product.image.link} alt={product.image.alt} title={product.image.title} />
            <p className='product-name'>{product.product_name}</p>
            <p className='product-price'>
                {product.currency.replace(product.currency, '\u00A3')}
                <span>{product.price}</span>
            </p>
        </div>
    )
}

import React from "react";
import "./Color.css"

export function Color({value, image_groups}) {
    const {link, alt, title} = image_groups
        .filter(({view_type, variation_value}) => view_type === "swatch" && variation_value === value)[0].images[0];
    return (
        <div className="color">
            <img src={link} alt={alt} title={title}/>
        </div>
    )
}

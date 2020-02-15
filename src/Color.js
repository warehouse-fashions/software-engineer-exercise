import React from "react";

export function Color({value, image_groups}) {
    const {link, alt, title} = image_groups
        .filter(({view_type, variation_value}) => view_type === "swatch" && variation_value === value)[0].images[0];
    return (
        <img src={link} alt={alt} title={title}/>
    )
}

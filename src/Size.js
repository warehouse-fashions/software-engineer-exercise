import React from "react";
import "./Size.css"

export function Size({name, isSelected, value, onClick}) {
    return (
        <div className={`size ${isSelected?"selected":""}`} onClick={onClick}><div>{name}</div></div>
    )
}

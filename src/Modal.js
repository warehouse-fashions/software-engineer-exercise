import React from "react";
import "./Modal.css";


export function Modal({onClose, children}) {
    return <div className='modal' onClick={onClose}>
        <div className="modal-body">
            {children}
        </div>
    </div>
}

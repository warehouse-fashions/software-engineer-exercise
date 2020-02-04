import React, { useState, forwardRef } from 'react';
import { CardMedia, Modal, Backdrop, ClickAwayListener } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSpring, animated } from 'react-spring';
import Slider from "react-slick";

import { NextArrow, PrevArrow } from '../components/CarouselArrows';

const Fade = forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const ProductItem = (props) => {
    const { data, isDragging, draggable, toggleDragging, toggleDraggable } = props;
    const {
        name,
        currency,
        variants,
        long_description: longDescription,
        variation_attributes: variationAttribute,
        image_groups: imageGroup
    } = data;

    const { alt, link, title } = imageGroup[0].images[0];
    const modalImageGroup = imageGroup[0].images.slice(1);

    const [open, setOpen] = useState(false)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const handleOpen = (event) => {
        if (isDragging || !draggable) {
            event.preventDefault();
            toggleDragging(false);
        } else {
            setOpen(true);
            toggleDraggable(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        toggleDraggable(true);
    };

    // disable onClick when carousel is being dragged
    let onDownPageX;
    const onDown = (e) => {
        onDownPageX = e.pageX
    }

    const onUp = (e) => {
        let onUpPageX = e.pageX
        if (Math.max(onDownPageX, onUpPageX) - Math.min(onDownPageX, onUpPageX) >= 10) {
            toggleDragging(true);
        }
    }

    return (
        <>
            <div className='product-item-container'
                onClick={handleOpen}
                onMouseDown={onDown}
                onMouseUp={onUp}
            >
                <CardMedia
                    className={'product-img'}
                    image={link}
                    title={title}
                    alt={alt}
                />
                <div className='product-title-container'>
                    <h3>
                        {name}
                    </h3>
                    <h4 className='product-price'>
                        {parseCurrency(variants[0].price, currency)}
                    </h4>
                </div>
                <Modal
                    disableEnforceFocus
                    aria-labelledby={name}
                    aria-describedby={longDescription}
                    className='product-modal'
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    disableBackdropClick
                    BackdropComponent={Backdrop}
                >
                    <Fade in={open}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div className='modal-card'>
                                <div onClick={handleClose} className='modal-close'>
                                    <CloseIcon />
                                </div>
                                <Slider {...settings} className='modal-carousel'>
                                    {modalImageGroup.map((image) => {
                                        const { alt, link, title } = image;
                                        return (
                                            <div key={alt} className='modal-img-outer-container'>
                                                <div className='modal-img-inner-container'>
                                                    <img
                                                        className='modal-img'
                                                        src={link}
                                                        title={title}
                                                        alt={alt}
                                                    />
                                                </div>
                                            </div>
                                        )

                                    })}
                                </Slider>
                                <div className='modal-description-container'>
                                    <div className='modal-title-container'>
                                        <h2 className="modal-title">{name}</h2>
                                        <span>{parseCurrency(variants[0].price, currency)}</span>
                                    </div>
                                    <div className='modal-colour-container'>
                                        <h3>Colours:</h3>
                                        <div className='modal-colour-img-group'>
                                            {variationAttribute[0].values.map((colour, index) => {
                                                const { alt, link, title } = imageGroup[1].images[index];
                                                return <img
                                                    src={link}
                                                    alt={alt}
                                                    title={title}
                                                    key={`${colour._type}-${colour.value}`}
                                                    value={colour.value} />
                                            })}
                                        </div>
                                    </div>
                                    <div className='modal-size-container'>
                                        {variationAttribute[1].values.map((size) => {
                                            return (
                                                <div key={`${size._type}-${size.value}`} value={size.value}>
                                                    {size.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="product-description-container">
                                        <span className="product-description">
                                            {longDescription}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

function parseCurrency(value, currency) {
    if (typeof value === 'undefined') {
        return 'undefined'
    }
    return new Intl.NumberFormat('en-uk', { style: 'currency', currency: currency || 'GBP' })
        .format(value)
}

export default ProductItem;
import React from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const NextArrow = ({ className = '', ...rest }) => <ArrowForwardIos {...rest} className={`slick-next ${className}`} />
const PrevArrow = ({ className = '', ...rest }) => <ArrowBackIos {...rest} className={`slick-prev ${className}`} />

export {NextArrow, PrevArrow};
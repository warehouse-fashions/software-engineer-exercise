import React from 'react';
import ReactDOM from 'react-dom';
import './css/global.css';
import ProductCarousel from './components/ProductCarousel';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ProductCarousel name='We Recommend' />, document.getElementById('root'));

serviceWorker.unregister();

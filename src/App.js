import React from 'react';
import WarehouseCarousel from './containers/warehouseCarousel';
import { data as ProductData } from './data/product.json';

import './styles/normalize.scss'
import './styles/App.scss';

function App() {
  return (
        <WarehouseCarousel ProductData={ProductData} />
  );
}

export default App;

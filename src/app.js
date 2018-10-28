import React from 'react';
import ReactDOM from 'react-dom';

import RecommendationsList from './components/RecommendationsList';

import 'bulma';
import './scss/style.scss';


function App() {
  return (
    <div className="App">
      <RecommendationsList />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

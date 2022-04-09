import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

import Home from './pages/home';
import About from './pages/about';
import store from './store';

// Switch routes here ...

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* Add more routes here.. */}
        </Routes>
      </BrowserRouter>{' '}
    </StoreProvider>
  );
};

export default App;

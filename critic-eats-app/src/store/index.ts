// Actual implementations of interfaces

import { createStore } from 'easy-peasy';
import PlacesStore from '../interfaces/Store';
import Store from '../interfaces/Store';
import Place from './Places';

const store: PlacesStore = {
  place: Place,
};

export default createStore<Store>(store);

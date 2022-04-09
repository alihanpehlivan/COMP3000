import { Action, Thunk, Computed } from 'easy-peasy';
import PlacesEntry from './PlacesEntry';

export default interface PlacesModel {
  entries: PlacesEntry[];
  reverseEntries: Computed<PlacesModel, PlacesEntry[]>;
  setEntries: Action<PlacesModel, PlacesEntry[]>;
  addEntry: Action<PlacesModel, PlacesEntry>;
  createEntry: Thunk<PlacesModel, PlacesEntry>;
  getEntries: Thunk<PlacesModel>;
}

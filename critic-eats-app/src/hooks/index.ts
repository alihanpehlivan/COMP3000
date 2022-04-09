import { createTypedHooks } from 'easy-peasy';
import PlacesStore from '../interfaces/Store';

const typedHooks = createTypedHooks<PlacesStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

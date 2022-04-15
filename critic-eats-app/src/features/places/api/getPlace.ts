import { doc, query, orderBy } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '@/providers/firebase';

import { Place } from '../types';

export const usePlace = (id: string) => {
  const ref = doc(db, 'places', id);
  const [snapshot, loading, error] = useDocument(ref);

  const place = {} as Place;
  if (snapshot) {
    place.id = snapshot.id;
    place.name = snapshot.get('name');
    place.description = snapshot.get('description');
    place.createdAt = snapshot.get('createdAt');
  }
  return { place: place, loading: loading, error: error };
};

import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/providers/firebase';

import { Place } from '../types';

const ref = collection(db, 'places');
const q = query(ref, orderBy('createdAt', 'desc'));

export const usePlaces = () => {
  const [snapshot, loading, error] = useCollection(q);
  const places = [] as Place[];

  if (snapshot) {
    snapshot.docs.forEach((doc) => {
      places.push({
        id: doc.id,
        name: doc.get('name'),
        description: doc.get('description'),
      });
    });
  }

  return { places: places, loading: loading, error: error };
};
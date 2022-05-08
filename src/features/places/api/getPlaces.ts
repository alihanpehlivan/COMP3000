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
        uuid: doc.get('uuid'),
        name: doc.get('name'),
        description: doc.get('description'),
        coverImageURI: doc.get('coverImageURI')
          ? doc.get('coverImageURI')
          : 'https://via.placeholder.com/512x256.jpg?text=No+Cover+Photo',
      });
    });
  }

  return { places: places, loading: loading, error: error };
};

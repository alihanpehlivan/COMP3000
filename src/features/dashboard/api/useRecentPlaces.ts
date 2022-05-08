import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Place } from '@/features/places';
import { db } from '@/providers/firebase';

export const useRecentPlaces = () => {
  const ref = collection(db, 'places');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(4));
  const [snapshot, loading, error] = useCollection(q);

  const places = [] as Place[];

  if (snapshot) {
    snapshot.docs.forEach((doc) => {
      places.push({
        id: doc.id,
        createdAt: doc.get('createdAt'),
        name: doc.get('name'),
        description: doc.get('description'),
        coverImageURI: doc.get('coverImageURI')
          ? doc.get('coverImageURI')
          : 'https://via.placeholder.com/512x256.jpg?text=No+Cover+Photo',
      });
    });
  }

  return { data: places, loading: loading, error: error };
};

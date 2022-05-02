import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import { Place } from '@/features/places';
import { db } from '@/providers/firebase';

export const useRecentPlaces = () => {
  const ref = collection(db, 'places');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(4));
  const [snapshot, loading, error] = useCollectionOnce(q);

  const places = [] as Place[];

  if (snapshot) {
    snapshot.docs.forEach((doc) => {
      places.push({
        id: doc.id,
        createdAt: doc.get('createdAt'),
        name: doc.get('name'),
        description: doc.get('description'),
      });
    });
  }

  return { data: places, loading: loading, error: error };
};

import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import { Review } from '@/features/reviews';
import { db } from '@/providers/firebase';

export const useRecentReviews = () => {
  const ref = collection(db, 'reviews');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(4));
  const [snapshot, loading, error] = useCollectionOnce(q);

  const reviews = [] as Review[];

  if (snapshot) {
    snapshot.docs.forEach((doc) => {
      reviews.push({
        id: doc.id,
        title: doc.get('title'),
        description: doc.get('description'),
        username: doc.get('username'),
        rating: doc.get('rating'),
        createdAt: doc.get('createdAt'),
      });
    });
  }

  return { data: reviews, loading: loading, error: error };
};

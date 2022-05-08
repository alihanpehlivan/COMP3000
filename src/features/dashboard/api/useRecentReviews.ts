import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Review } from '@/features/reviews';
import { db } from '@/providers/firebase';

export const useRecentReviews = () => {
  const ref = collection(db, 'reviews');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(4));
  const [snapshot, loading, error] = useCollection(q);

  const reviews = [] as Review[];

  if (snapshot) {
    snapshot.docs.forEach((doc) => {
      reviews.push({
        id: doc.id,
        title: doc.get('title'),
        description: doc.get('description'),
        username: doc.get('username'),
        uuid: doc.get('uuid'),
        rating: doc.get('rating'),
        createdAt: doc.get('createdAt'),
        coverImageURI: doc.get('coverImageURI')
          ? doc.get('coverImageURI')
          : 'https://via.placeholder.com/512x256.jpg?text=No+Cover+Photo',
      });
    });
  }

  return { data: reviews, loading: loading, error: error };
};

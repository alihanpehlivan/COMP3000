import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '@/providers/firebase';

import { Review } from '../types';

export const useReview = (id: string) => {
  const ref = doc(db, 'reviews', id);
  const [snapshot, loading, error] = useDocument(ref);

  const review = {} as Review;
  if (snapshot) {
    review.id = snapshot.id;
    review.title = snapshot.get('title');
    review.description = snapshot.get('description');
    review.username = snapshot.get('username');
    review.rating = snapshot.get('rating');
    review.createdAt = snapshot.get('createdAt');
  }
  return { review: review, loading: loading, error: error };
};

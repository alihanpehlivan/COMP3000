import {
  collection,
  query,
  orderBy,
  where,
  documentId,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/providers/firebase';

import { Review } from '../types';

export const useReviews = (id: string) => {
  const reviewsRef = collection(db, 'reviews');
  const q = query(reviewsRef, where('placeId', '==', id));
  const [snapshot, loading, error] = useCollection(q);

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

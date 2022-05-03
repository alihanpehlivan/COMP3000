import { collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';

import { db } from '@/providers/firebase';

export const createUser = (userId: string) => {
  const ref = collection(db, 'users');

  // Create doc with custom id
  return setDoc(doc(ref, userId), {
    createdAt: serverTimestamp(),
  });
};

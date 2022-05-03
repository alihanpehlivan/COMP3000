import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/providers/firebase';

import { User } from '../types';

export const updateUser = (dto: User) => {
  const ref = doc(db, `users/${dto.id}`);
  return updateDoc(ref, { username: dto.username });
};

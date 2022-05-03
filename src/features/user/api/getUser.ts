import { doc, FirestoreError } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db, auth } from '@/providers/firebase';

import { User } from '../types';

export const useUser = () => {
  const user = {} as User;
  const [authUser, authLoading, authErr] = useAuthState(auth);
  const [authData, authDataLoading, authDataErr] = useDocument(
    authUser ? doc(db, `users/${authUser.uid}`) : null
  );

  if (authUser && authData) {
    user.id = authUser.uid;
    user.createdAt = authData.get('createdAt');
    user.username = authData.get('username');
  }

  return {
    data: user,
    // Helpful functions
    isLoggedIn: user.id !== undefined,
    isLoading: authLoading || authDataLoading,
    authErr: authErr,
    authDataErr: authDataErr,
  };
};

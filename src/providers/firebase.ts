import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAGd4i_lyW2lWoAtjPi0EQe2pL5mHGqeNw',
  authDomain: 'critic-eats.firebaseapp.com',
  projectId: 'critic-eats',
  storageBucket: 'critic-eats.appspot.com',
  messagingSenderId: '700144074167',
  appId: '1:700144074167:web:db476afbb1a9d46d4fbc32',
};

// Initialize app, database and auth
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };

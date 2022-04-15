import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGd4i_lyW2lWoAtjPi0EQe2pL5mHGqeNw',
  authDomain: 'critic-eats.firebaseapp.com',
  projectId: 'critic-eats',
  storageBucket: 'critic-eats.appspot.com',
  messagingSenderId: '700144074167',
  appId: '1:700144074167:web:db476afbb1a9d46d4fbc32',
};

// Init the app
initializeApp(firebaseConfig);

// Init the database
export const db = getFirestore();

import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '@/providers/firebase';

export const usePlaceCoverPhoto = (placeId: string) => {
  const ref = doc(db, `places/${placeId}`);
  const [snapshot, loading, error] = useDocument(ref);

  let coverImageURI = '';
  if (snapshot) coverImageURI = snapshot.get('coverImageURI');
  return { coverImageURI: coverImageURI, loading: loading, error: error };
};

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import getCollegeLogo from './getCollegeLogo';

const COLLEGES_DB_PATH = 'dummy-colleges';

export default async function getCollege(id: string) {
  const querySnapshot = await getDocs(query(collection(db, COLLEGES_DB_PATH), where('collegeID', '==', Number(id))));

  if (querySnapshot.docs.length > 0) {
    const data = querySnapshot.docs[0].data();
    const logoURL = await getCollegeLogo(data.collegeID);
   
    return { ...data, collegeLogo: logoURL };

  } else {
    return null;
  };
};
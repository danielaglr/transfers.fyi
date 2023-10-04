import { collection, getDocs } from 'firebase/firestore';
import { db, sb } from '../../firebase';
import getCollegeLogo from './getCollegeLogo';
import sortDocuments from './sortDocuments';

const COLLEGES_DB_PATH = 'dummy-colleges';

export default async function getColleges() {
  const querySnapshot = await getDocs(collection(db, COLLEGES_DB_PATH));

  const downloadPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const logoURL = await getCollegeLogo(data.collegeID);

    return { ...data, collegeLogo: logoURL };
  });

  const docData = await Promise.all(downloadPromises);
  return sortDocuments(docData);
};
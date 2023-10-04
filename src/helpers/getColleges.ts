import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, sb } from '../../firebase';
import sortDocuments from './sortDocuments';

const COLLEGES_DB_PATH = 'dummy-colleges';

export default async function getColleges() {
  const querySnapshot = await getDocs(collection(db, COLLEGES_DB_PATH));

  const downloadPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();

    const logoRef = ref(sb, 'University Logos/' + data.collegeID + '.png');
    const url = await getDownloadURL(logoRef);

    return { ...data, collegeLogo: url };
  });

  const docData = await Promise.all(downloadPromises);
  return sortDocuments(docData);
};
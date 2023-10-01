import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase';

const COLLEGES_DB_PATH = 'dummy-colleges';

export default async function getColleges() {
  var docData = <DocumentData>[];

  const querySnapshot = await getDocs(collection(db, COLLEGES_DB_PATH));

  querySnapshot.forEach((doc) => {
    docData.push(doc.data());
  });

  return docData;
};
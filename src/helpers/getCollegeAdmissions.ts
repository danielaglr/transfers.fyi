import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const COLLEGES_DB_PATH = 'dummy-colleges';

export default async function getCollegeAdmissions(id: string) {
  const collegesSnapshot = await getDocs(query(collection(db, COLLEGES_DB_PATH), where('collegeID', '==', Number(id))));

  const collegeDocRef = doc(db, COLLEGES_DB_PATH, collegesSnapshot.docs[0].id);

  const admissionsSnapshot = await getDocs(collection(collegeDocRef, 'admissions'));

  return admissionsSnapshot.docs.map(doc => doc.data());
};
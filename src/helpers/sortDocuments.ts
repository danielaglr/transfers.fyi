import { DocumentData } from 'firebase/firestore'

export default function sortDocuments(docs: DocumentData[]) {
  return docs.sort(function (a, b) {
    return a.collegeName.localeCompare(b.collegeName);
  });
};
import { getDownloadURL, ref } from 'firebase/storage';
import { sb } from '../../firebase';

export default async function getCollegeLogo(id: number) {
  const logoRef = ref(sb, 'University Logos/' + id + '.png');
  const url = await getDownloadURL(logoRef);

  return url;
};
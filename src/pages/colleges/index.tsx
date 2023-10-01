import { DocumentData } from 'firebase/firestore';
import getColleges from '@/helpers/getColleges';
import Link from 'next/link';
import Image from 'next/image';
import { Autocomplete, TextField } from '@mui/material';

function CollegeCard(props: DocumentData) {
  const { college } = props;

  return (
    <Link href={`/colleges/${college.collegeID}`} className='w-72 h-48 bg-white border border-gray-100 rounded-md shadow-sm'>
      <Image src={college.collegeLogo} width={128} height={128}  alt={college.collegeName + ' Logo'} />
      <span className='text-gray-800 text-center font-medium'>{college.collegeName}</span>
    </Link>
  )
};

interface CollegesProps {
  colleges: DocumentData[];
};

function Colleges({ colleges }: CollegesProps) {
  return (
    <div className='flex flex-row justify-between min-h-[calc(100vh_-_100px)] bg-gray-50 p-12'>
      <div className='flex flex-col max-w-md 2xl:max-w-lg'>
        <h1 className='text-3xl text-gray-800 text-left font-bold mb-10'>Search or filter for college-specific transfer admission data!</h1>
      </div>
      <div className='flex flex-1 flex-col pt-2'>
        <div className=''>
          <Autocomplete disablePortal options={} renderInput={(params) => <TextField {...params} label="College" />} size='small' />
        </div>
      </div>
    </div>
  )
};

export async function getStaticProps() {
  const colleges = await getColleges();

  return {
    props: {
      colleges
    }
  }
};

export default Colleges;
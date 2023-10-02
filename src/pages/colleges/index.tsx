import { DocumentData } from 'firebase/firestore';
import getColleges from '@/helpers/getColleges';
import Link from 'next/link';
import Image from 'next/image';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { sb } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

function CollegeCard(props: DocumentData) {
  const [imageURL, setImageUrl] = useState('');
  const { college } = props;

  const logosRef = ref(sb, 'University Logos/' + college.collegeID + '.png');
  getDownloadURL(logosRef).then((url) => {
    setImageUrl(url);
  });

  return (
    <Link href={`/colleges/${college.collegeID}`} className='flex flex-col justify-center items-center min-w-72 h-48 bg-white border border-gray-100 px-2 rounded-xl shadow-sm'>
      <div className='flex justify-center items-center h-32'>
        <Image src={imageURL} width={128} height={128}  alt={college.collegeName + ' Logo'} />
      </div>
      <span className='text-gray-800 text-center font-medium'>{college.collegeName}</span>
    </Link>
  )
};

interface CollegesProps {
  colleges: DocumentData[];
};

function Colleges({ colleges }: CollegesProps) {
  const [selectedSchool, setSelectedSchool] = useState<DocumentData | null>(null);

  function handleColleges() {
    if (selectedSchool !== null) {
      const filteredColleges = colleges;
      return filteredColleges.filter(function(college) {
        return college === selectedSchool;
      });
    } else {
      return colleges
    }
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between min-h-[calc(100vh_-_100px)] bg-gray-50 pt-10 px-6 lg:p-12'>
      <div className='flex flex-col lg:max-w-xs xl:max-w-md 2xl:max-w-lg'>
        <h1 className='text-2xl 2xl:text-3xl text-gray-800 text-center lg:text-left font-bold mb-10'>Search or filter for college-specific transfer admission data!</h1>
      </div>
      <div className='flex flex-1 flex-col pt-2 px-4'>
        <Autocomplete 
          disablePortal
          clearOnEscape
          fullWidth
          options={colleges}
          getOptionLabel={(doc) => doc.collegeName}
          renderInput={(params) => <TextField {...params} label='Search Schools' />}
          value={selectedSchool}
          onChange={(event, newVal) => setSelectedSchool(newVal)}
          size='small'
          sx={{ backgroundColor: '#fff', marginBottom: 2, '& label.Mui-focused': { color: '#00AC6D' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#00BF78' } } }}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4'>
          {handleColleges().map((item, index) => {
            return (
              <CollegeCard key={index} college={item} />
            )
          })}
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
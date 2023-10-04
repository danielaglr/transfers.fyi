import { DocumentData } from 'firebase/firestore';
import getColleges from '@/helpers/getColleges';
import Link from 'next/link';
import Image from 'next/image';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { useMemo, useState } from 'react';

function CollegeCard(props: DocumentData) {
  const { college } = props;

  return (
    <Link href={`/colleges/${college.collegeID}`} className='flex flex-col justify-center items-center min-w-72 h-48 bg-white border border-gray-100 px-2 rounded-xl shadow-sm'>
      <div className='flex justify-center items-center h-32'>
        <Image 
        priority={true} 
        src={college.collegeLogo} 
        width={128}
        height={128}
        className='object-contain'
        alt={college.collegeName + ' Logo'}
        />
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
  const [toggleFilters, setToggleFilters] = useState({
    IVYSchools: true,
    UCSchools: true,
    PublicCollege: true,
    PrivateCollege: true,
  });

  function handleColleges() {
    let filteredColleges = colleges;

    if (selectedSchool !== null) { 
      filteredColleges = filteredColleges.filter(college => college === selectedSchool); 
    };

    filteredColleges = filteredColleges.filter(college => {
      if (toggleFilters.IVYSchools && college.schoolType === 'Ivy League') {
        return true;
      }
      if (toggleFilters.UCSchools && college.schoolType === 'UC School') {
        return true;
      }
      if (toggleFilters.PublicCollege && college.collegeType === 'Public') {
        return true;
      }
      if (toggleFilters.PrivateCollege && college.collegeType === 'Private') {
        return true;
      }
      return false;
    });

    return filteredColleges;
  };

  const filteredColleges = useMemo(() => handleColleges(), [colleges, selectedSchool, toggleFilters]);

  return (
    <div className='flex flex-col lg:flex-row justify-between h-[calc(100vh_-_100px)] bg-gray-50 pt-10 px-6 lg:p-12 overflow-hidden'>
      <div className='flex flex-col lg:max-w-xs 2xl:max-w-md 3xl:max-w-lg'>
        <h1 className='text-xl xl:text-2xl 2xl:text-3xl text-gray-800 text-center lg:text-left font-bold mb-8'>Search or filter for college-specific transfer admission data!</h1>
        <div className='flex flex-col border-b border-gray-200 pb-4'>
          <span className='text-base text-gray-800 font-semibold'>School Type</span>
          <div className='flex flex-row items-center'>
            <Checkbox 
            checked={toggleFilters.IVYSchools} 
            onChange={() => setToggleFilters({ ...toggleFilters, IVYSchools: !toggleFilters.IVYSchools })}
            sx={{ '&.Mui-checked': { color: '#00AC6D' } }}
            />
            <span className='text-base text-gray-800 font-medium'>Ivy League Schools</span>
          </div>
          <div className='flex flex-row items-center'>
            <Checkbox 
            checked={toggleFilters.UCSchools} 
            onChange={() => setToggleFilters({ ...toggleFilters, UCSchools: !toggleFilters.UCSchools })}
            sx={{ '&.Mui-checked': { color: '#00AC6D' } }}
            />
            <span className='text-base text-gray-800 font-medium'>UC Schools</span>
          </div>
        </div>
        <div className='flex flex-col border-b border-gray-200 py-4'>
          <span className='text-base text-gray-800 font-semibold'>College Type</span>
          <div className='flex flex-row items-center'>
            <Checkbox 
            checked={toggleFilters.PrivateCollege} 
            onChange={() => setToggleFilters({ ...toggleFilters, PrivateCollege: !toggleFilters.PrivateCollege })}
            sx={{ '&.Mui-checked': { color: '#00AC6D' } }}
            />
            <span className='text-base text-gray-800 font-medium'>Private Colleges</span>
          </div>
          <div className='flex flex-row items-center'>
            <Checkbox 
            checked={toggleFilters.PublicCollege} 
            onChange={() => setToggleFilters({ ...toggleFilters, PublicCollege: !toggleFilters.PublicCollege })}
            sx={{ '&.Mui-checked': { color: '#00AC6D' } }}
            />
            <span className='text-base text-gray-800 font-medium'>Public Colleges</span>
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col pt-2 px-4 overflow-hidden'>
        <Autocomplete 
          disablePortal
          clearOnEscape
          fullWidth
          options={filteredColleges}
          getOptionLabel={(doc) => doc.collegeName}
          renderInput={(params) => <TextField {...params} label='Search Schools' />}
          value={selectedSchool}
          onChange={(event, newVal) => setSelectedSchool(newVal)}
          size='small'
          sx={{ backgroundColor: '#fff', marginBottom: 2, 
          '& label.Mui-focused': { color: '#00AC6D' }, 
          '& .MuiOutlinedInput-root': { 
            '&.Mui-focused fieldset': { borderColor: '#00BF78' } 
          } }}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 overflow-y-auto'>
          {filteredColleges.map((item, index) => {
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
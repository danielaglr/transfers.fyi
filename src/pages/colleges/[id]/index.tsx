import getCollege from '@/helpers/getCollege';
import getCollegeData from '@/helpers/getCollege';
import { DocumentData } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

interface CollegeProps {
  college: DocumentData
};

function College(props: CollegeProps) {
  const { college } = props;

  return (
    <div className='flex flex-col lg:flex-row h-[calc(100vh_-_100px)] bg-gray-50 pt-10 px-6'>
      <div className='flex flex-col w-1/3'>
        <div className='flex flex-col items-center my-10'>
          <Image src={college.collegeLogo} width={256} height={256} alt='Logo' />
          <h1 className='text-3xl text-gray-800 font-bold mt-4'>{college.collegeName}</h1>
        </div>
      </div>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const collegeID = context.query.id as string;
  const college = await getCollege(collegeID);

  return {
    props: {
      college
    }
  }
};

export default College;
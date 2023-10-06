import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import getCollege from '@/helpers/getCollege';
import getCollegeAdmissions from '@/helpers/getCollegeAdmissions';

interface CollegeProps {
  college: DocumentData,
  admissionData: DocumentData[]
};

function College(props: CollegeProps) {
  const { college, admissionData } = props;

  return (
    <div className='flex flex-col lg:flex-row items-center min-h-[calc(100vh_-_100px)] overflow-hidden px-10'>
      <div className='flex flex-col justify-center max-w-lg 2xl:max-w-2xl h-full items-center px-4'>
        <Image 
        src={college.collegeLogo} 
        width={256} 
        height={256} 
        className='object-contain object-center' 
        alt={college.collegeName + ' Logo'} 
        />
        <div className='mt-12'>
          <h1 className='text-3xl text-gray-800 text-center font-semibold'>{college.collegeName || 'College Name'}</h1>
        </div>
        <div className='flex flex-row flex-wrap justify-evenly w-full my-8'>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>College Type</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.collegeType || 'College Type'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>Location</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.location || 'College Location'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>In-State Tuition</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.inStateTuition || '00000'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>Out-of-State Tuition</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.outStateTuition || '00000'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>Admission Rate</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.admissionRate || '00%'}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-1 h-full justify-start lg:justify-center items-center overflow-x-auto overflow-y-hidden whitespace-nowrap'>
        <table className='flex flex-col w-full'>
          <thead className='w-full h-14 bg-gray-50 rounded-t-md'>
            <tr className='flex flex-row justify-evenly items-center w-full h-full'>
              <th className='flex justify-center items-center min-w-[8rem] text-sm text-black text-center font-medium tracking-wider uppercase'>Class</th>
              <th className='flex justify-center items-center min-w-[8rem] text-sm text-black text-center font-medium tracking-wider uppercase'>Major</th>
              <th className='flex justify-center items-center min-w-[8rem] text-sm text-black text-center font-medium tracking-wider uppercase'>College GPA</th>
              <th className='flex justify-center items-center min-w-[10rem] text-sm text-black text-center font-medium tracking-wider uppercase'>Highschool GPA</th>
              <th className='flex justify-center items-center min-w-[8rem] text-sm text-black text-center font-medium tracking-wider uppercase'>Honors</th>
              <th className='flex justify-center items-center min-w-[8rem] text-sm text-black text-center font-medium tracking-wider uppercase'>Status</th>
            </tr>
          </thead>
          <tbody className='flex flex-col bg-white border border-gray-50 rounded-b-md'>
            {admissionData.map((row, index) => {
              return (
                <tr key={index} className='flex flex-row justify-evenly items-center w-full h-16 border-t border-gray-100'>
                  <td className='flex justify-center items-center min-w-[8rem] text-xs text-gray-800 font-medium leading-5'>{row.class}</td>
                  <td className='flex justify-center items-center min-w-[8rem] text-xs text-gray-800 font-medium leading-5'>{row.major}</td>
                  <td className='flex justify-center items-center min-w-[8rem] text-xs text-gray-800 font-medium leading-5'>{(Math.round(row.collegeGPA * 100) / 100).toFixed(2)}</td>
                  <td className='flex justify-center items-center min-w-[10rem] text-xs text-gray-800 font-medium leading-5'>{(Math.round(row.highschoolGPA * 100) / 100).toFixed(2)}</td>
                  <td className='flex justify-center items-center min-w-[8rem] text-xs text-gray-800 font-medium leading-5'>{row.honors ? 'Yes' : 'No'}</td>
                  <td className={`flex justify-center items-center min-w-[8rem] text-xs text-gray-800 font-medium leading-5`}>{row.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const collegeID = context.query.id as string;
  const college = await getCollege(collegeID);
  const admissionData = await getCollegeAdmissions(collegeID);

  return {
    props: {
      college,
      admissionData
    }
  }
};

export default College;
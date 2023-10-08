import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import getCollege from '@/helpers/getCollege';
import getCollegeAdmissions from '@/helpers/getCollegeAdmissions';
import formatNumber from '@/util/formatNumber';
import getColleges from '@/helpers/getColleges';
import { useEffect, useState } from 'react';


function AdmissionsTable(props: { admissionData: DocumentData[] }) {
  const { admissionData } = props;

  return (
    <div className='md:flex md:justify-center w-screen overflow-x-auto overflow-y-hidden mb-10'>
      <table className='w-[45rem] lg:w-[52rem]'>
        <thead className='bg-gray-50'>
          <tr className='flex justify-evenly items-center w-full h-16 text-xs font-medium uppercase tracking-wider'>
            <th className='w-1/6'> Class </th>
            <th className='w-1/5'> Major </th>
            <th className='w-1/6'> College GPA </th>
            <th className='w-1/4'> Highschool GPA </th>
            <th className='w-1/6'> Honors </th>
            <th className='w-1/6'> Status </th>
          </tr>
        </thead>
        <tbody className='bg-white border border-t-0 border-gray-100 rounded-b-md'>
          {admissionData.map((row, index) => {
            let statusStyling;

            if (row.status === 'Accepted') { statusStyling = 'text-green-900 bg-green-100' }
            else if (row.status === 'Waitlisted') { statusStyling = 'text-blue-900 bg-blue-100' }
            else if (row.status === 'Rejected') { statusStyling = 'text-red-900 bg-red-100' }

            return (
              <tr key={index} className='flex justify-evenly items-center w-full h-14 text-sm text-gray-800 text-center text-wrap font-medium leading-5'>
                <td className='w-1/6'>{row.class}</td>
                <td className='w-1/5'>{row.major}</td>
                <td className='w-1/6'>{(Math.round(row.collegeGPA * 100) / 100).toFixed(2)}</td>
                <td className='w-1/4'>{(Math.round(row.collegeGPA * 100) / 100).toFixed(2)}</td>
                <td className='w-1/6'>{row.honors ? 'Yes' : 'No'}</td>
                <td className='w-1/6'>
                  <span className={`${statusStyling} px-3 py-1 rounded-xl`}>{row.status}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};


interface CollegeProps {
  college: DocumentData
};

function College(props: CollegeProps) {
  const { college } = props;
  const [admissionData, setAdmissionData] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function fetchAdmissions() {
      const data = await getCollegeAdmissions(college.collegeID);

      setAdmissionData(data);
    };

    fetchAdmissions();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row justify-center lg:justify-normal items-center w-screen min-h-[calc(100vh_-_100px)] px-10'>
      <div className='flex flex-col justify-center max-w-lg 2xl:max-w-2xl h-full items-center lg:px-4'>
        <Image 
        src={college.collegeLogo} 
        width={256} 
        height={256} 
        className='object-contain object-center' 
        alt={college.collegeName + ' Logo'} 
        />
        <div className='my-10'>
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
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.inStateTuition ? formatNumber(college.inStateTuition) : '00000'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>Out-of-State Tuition</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.outStateTuition ? formatNumber(college.outStateTuition) : '00000'}</span>
          </div>
          <div className='text-center lg:px-8 mb-4'>
            <h2 className='text-sm text-transfers-dark font-semibold tracking-widest mb-1'>Admission Rate</h2>
            <span className='text-lg text-gray-900 font-medium mb-3'>{college.admissionRate || '00%'}</span>
          </div>
        </div>
      </div>
      <div className='flex lg:flex-1 justify-center items-center lg:w-[60%] lg:h-full'>
        <AdmissionsTable admissionData={admissionData} />
      </div>
    </div>
  )
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const collegeID = context.params?.id as string;
  const college = await getCollege(collegeID);

  return {
    props: {
      college
    }
  };
};

export async function getStaticPaths() {
  const colleges = await getColleges();
  const paths = colleges.map(college => {
    return {
      params: { id: String(college.collegeID) }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export default College;
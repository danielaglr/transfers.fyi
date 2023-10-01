import { Inter } from 'next/font/google';
import Link from 'next/link';

const Int = Inter({ subsets: ['latin'] });

function SchoolCarousel() {

  interface School {
    schoolName: string
  };

  const SchoolLogo = (props: School) => (
    <li className='flex items-center h-full text-center ml-16 select-none'>
      <span className={`text-5xl md:text-6xl text-white ${Int.className} font-black`}>{props.schoolName}</span>
    </li>
  );

  const Schools = [
    'UCLA', 'Carnegie Mellon', 'UCB',
    'Stanford', 'Yale', 'Northwestern',
    'UPenn', 'John Hopkins', 'UCSD',
    'UIUC'
  ];

  return (
    <div className='flex flex-nowrap overflow-x-hidden'>
      <ul className='flex justify-center items-center h-20 animate-infinite-scroll whitespace-nowrap'>
        {Schools.map((school, index) => {
          return (
            <SchoolLogo key={index} schoolName={school} />
          )
        })}
      </ul>
      <ul className='flex justify-center items-center h-20 animate-infinite-scroll whitespace-nowrap'>
        {Schools.map((school, index) => {
          return (
            <SchoolLogo key={index} schoolName={school} />
          )
        })}
      </ul>
    </div>
  )
};

function Landing() {
  return (
    <>
      <section className='flex bg-transfers-light md:pb-12 lg:pb-28 xl:pb-36'>
        <div className='flex flex-col xl:flex-row justify-between w-full pt-8 md:pt-16 px-5 md:px-20 pb-20'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-col max-w-xl xl:max-w-2xl 2xl:max-w-3xl justify-center text-gray-800 sm:mb-20 md:mb-12'>
              <h1 className='text-5xl lg:text-6xl font-bold md:font-black mt-4 mb-10'>Welcome to your transfer admissions one-stop shop.</h1>
              <h2 className='text-xl mb-12'>Tired of the lack of transfer student resources? Get up-to-date information on opportunities for transfer students, what classes you need to transfer, and compare your stats with other successful transfers.</h2>
              <div className='mb-12'>
                <Link href='/signup' className='text-white hover:text-gray-100 bg-transfers hover:bg-transfers-dark active:bg-transfers-dark px-12 py-3 rounded'>Get started!</Link>
              </div>
              <span className='text-sm text-gray-800 mb-10 lg:mb-0'><span className='text-transfers-dark'>1000+</span> Transfer applications submitted!</span>
            </div>
          </div>
          <div className='hidden xl:flex xl:justify-center xl:items-center'>
            <img src='./undraw-reading.svg' className='bg-white border-2 border-transfers-dark p-6 rounded-2xl' />
          </div>
        </div>
      </section>
      <section className='block bg-transfers-dark pt-10 pb-14'>
        <h2 className='text-2xl text-white text-center font-semibold mb-8 lg:mb-12 xl:mb-10'>Built to give you the most relevant information about the top schools.</h2>
        <SchoolCarousel />
      </section>
      <section className='flex flex-col justify-center items-center text-gray-800 bg-white p-8 sm:p-12 py-20'>
        <h1 className='text-5xl md:text-7xl text-center font-bold pt-12'>The best transfer student resource</h1>
        <p className='max-w-2xl lg:max-w-4xl text-xl text-center my-4'>We&apos;re here to help you throughout your transfer journey. Join over <b>1,000</b> transfer students who have submitted more than <b>5,000</b> well-informed applications through Transfers.fyi this year.</p>
        <div className='flex flex-col justify-center items-center mt-16'>
          <div className='flex flex-col lg:flex-row justify-center items-center'>
            <div className='flex justify-center items-center w-[300px] sm:w-[500px] h-[200px] sm:h-[400px] border-4 border-transfers-dark p-4 rounded-3xl'>
              <img src='./undraw-list.svg' className='w-full h-full' alt='List Image' />
            </div>
            <div className='flex justify-center items-center lg:w-3/4 xl:w-1/2 h-full pt-10 lg:pt-0'>
              <div className='flex flex-col justify-center w-full sm:w-4/5 lg:w-3/4 h-2/3 p-2 lg:p-4'>
                <h3 className='text-3xl sm:text-4xl lg:text-5xl text-center font-bold'>Cumulative list of all essential transfer resources</h3>
                <p className='sm:text-lg text-center mt-4'>Forget navigating through tens of websites trying to get relevant transfer information. Discover a comprehensive list of all the useful resources you would ever need on your path to transfer.</p>
                <div className='flex justify-center'>
                  <Link href='/resources' className='text-sm text-white bg-transfers-dark px-4 py-2 mt-4 rounded-3xl'>See Resources</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-center items-center w-full mt-12'>
            <div className='hidden lg:flex justify-center items-center lg:w-3/4 xl:w-1/2 h-full'>
              <div className='flex lg:flex-col lg:justify-center w-full sm:w-4/5 lg:w-3/4 h-2/3 p-2 lg:p-4'>
                <h3 className='text-3xl sm:text-4xl lg:text-5xl text-center font-bold'>Extensive admission information from all the top colleges</h3>
                <p className='sm:text-lg text-center mt-4'>Forget navigating through tens of websites trying to get relevant transfer information. Discover a comprehensive list of all the useful resources you would ever need on your path to transfer.</p>
                <div className='flex justify-center'>
                  <Link href='/colleges' className='text-sm text-white bg-transfers-dark px-4 py-2 mt-4 rounded-3xl'>View Colleges</Link>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center w-[300px] sm:w-[500px] h-[200px] sm:h-[400px] border-4 border-transfers-dark p-4 rounded-3xl'>
              <img src='./undraw-analysis.svg' className='w-full h-full' alt='List Image' />
            </div>
            <div className='lg:hidden flex justify-center items-center lg:w-3/4 xl:w-1/2 h-full pt-10 lg:pt-0'>
              <div className='flex flex-col justify-center w-full sm:w-4/5 lg:w-3/4 h-2/3 p-2 lg:p-4'>
                <h3 className='text-3xl sm:text-4xl lg:text-5xl text-center font-bold'>Extensive admission information from all the top colleges</h3>
                <p className='sm:text-lg text-center mt-4'>Forget navigating through tens of websites trying to get relevant transfer information. Discover a comprehensive list of all the useful resources you would ever need on your path to transfer.</p>
                <div className='flex justify-center'>
                  <Link href='/colleges' className='text-sm text-white bg-transfers-dark px-4 py-2 mt-4 rounded-3xl'>View Colleges</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-center items-center mt-12'>
            <div className='flex justify-center items-center w-[300px] sm:w-[500px] h-[200px] sm:h-[400px] border-4 border-transfers-dark p-4 rounded-3xl'>
              <img src='./undraw-classes.svg' className='w-full h-full' alt='List Image' />
            </div>
            <div className='flex justify-center items-center lg:w-3/4 xl:w-1/2 h-full pt-10 lg:pt-0'>
              <div className='flex flex-col justify-center w-full sm:w-4/5 lg:w-3/4 h-2/3 p-2 lg:p-4'>
                <h3 className='text-3xl sm:text-4xl lg:text-5xl text-center font-bold'>Skip the guessing and see exactly which classes to take</h3>
                <p className='sm:text-lg text-center mt-4'>Forget navigating through tens of websites trying to get relevant transfer information. Discover a comprehensive list of all the useful resources you would ever need on your path to transfer.</p>
                <div className='flex justify-center'>
                  <Link href='/classes' className='text-sm text-white bg-transfers-dark px-4 py-2 mt-4 rounded-3xl'>Find Classes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Landing;
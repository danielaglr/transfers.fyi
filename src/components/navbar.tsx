import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <nav className='block bg-white p-6 xl:p-6'>
      <div className='flex flex-row justify-between items-center w-full md:px-6 xl:px-14'>
        <div className='flex flex-row justify-between items-center w-full'>
          <Link href='/' className='flex flex-row items-center pb-1'>
            <Image src='./logo.svg' width={48} height={48} alt='Logo' />
            <span className='text-3xl text-gray-800 font-bold ml-2'>Transfers.fyi</span>
          </Link>
          <div className='hidden lg:flex lg:flex-1 lg:justify-between lg:items-center ml-10'>
            <div className='flex items-center space-x-10'>
              <Link href='/resources' className='text-gray-500 hover:text-gray-900 font-semibold'>Resources</Link>
              <Link href='/colleges' className='text-gray-500 hover:text-gray-900 font-semibold'>Colleges</Link>
              <Link href='/classes' className='text-gray-500 hover:text-gray-900 font-semibold'>Classes</Link>
            </div>
            <Link href='/dashboard' className='text-transfers hover:text-white hover:bg-[#00BF78] border-2 border-transfers px-5 py-3 rounded'>Dashboard</Link>
          </div>
        </div>
        <div className='lg:hidden'>
          <button onClick={() => setMobileNav(!mobileNav)} className='flex justify-center items-center w-10 h-10 active:bg-slate-100 rounded-md'>
            <FontAwesomeIcon icon={faBars} size='xl' />
          </button>
        </div>
      </div>
      {mobileNav &&
        <div className='lg:hidden flex flex-col'>
          <Link href='/dashboard' className='text-lg text-gray-900 text-center font-semibold py-1'>Dashboard</Link>
          <Link href='/resources' className='text-lg text-gray-900 text-center font-semibold py-1'>Resources</Link>
          <Link href='/colleges' className='text-lg text-gray-900 text-center font-semibold py-1'>Colleges</Link>
          <Link href='/classes' className='text-lg text-gray-900 text-center font-semibold py-1'>Classes</Link>
        </div>   
      }
    </nav>
  )
};

export default Navbar;
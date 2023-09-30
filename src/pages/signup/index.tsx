import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  function handleSignIn() {
    auth?.signInWithGoogle();
  };

  useEffect(() => {
    if (auth?.user != null) router.push('/dashboard');
  }, []);

  return (
    <div className='flex justify-center items-center h-[calc(100vh_-_100px)]'>
      <div className='flex flex-col items-center mb-32'>
        <Image src='./logos/transfers-logo.svg' width={80} height={80} alt='Logo' />
        <h1 className='text-3xl sm:text-5xl text-gray-800 text-center font-bold border-b pt-2 pb-6 mb-4'>Login or Sign Up</h1>
        <button onClick={handleSignIn} className='flex justify-center items-center w-full text-sm text-gray-800 hover:text-white text-center font-medium hover:bg-transfers active:bg-transfers-dark border border-gray-300 px-4 py-2 mt-4 mb-8 rounded-lg'>
          <Image src='./logos/icon8-google.svg' className='mr-2' width={24} height={24} alt='Google Logo' />
          Log in or Sign up with Google 
        </button>
        <span className='text-xs text-gray-800 font-semibold'>Dont want to make an account? <Link href='/dashboard' className='text-transfers'>Go to dashboard.</Link></span>
      </div>
    </div>
  )
};

export default SignUp;
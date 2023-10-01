import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className='flex justify-between w-full bg-gray-100 px-10 py-6'>
      <div className='flex flex-row items-center'>
        <Link href='/'>
          <Image src='/logos/transfers-logo.svg' width={36} height={36} alt='Logo' />
        </Link>
        <Link href='/changelog' className='text-sm text-gray-800 ml-6'>Changelog</Link>
        <Link href='/notice' className='text-sm text-gray-800 ml-6'>Data Notice</Link>
      </div>
      <div className='flex justify-center items-center'>
        <a href='https://github.com/danielaglr/transfers.fyi' target='_blank' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size='xl' />
        </a>
      </div>
    </div>
  )
}

export default Footer;
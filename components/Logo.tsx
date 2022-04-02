import Link from 'next/link';

const LogoComponent = (props) => {
  return (
    <Link href='/'>
      <a>
        <span className='sr-only'>NameScratch</span>
        <img {...props} src='/NameScratch.svg' alt='NameScratch Logo' />
      </a>
    </Link>
  );
};

export default LogoComponent;

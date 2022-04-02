import Head from 'next/head';
import { NextSeo } from 'next-seo';
import '../styles/globals.css';
import { GlobalStateProvider } from '../providers/GlobalStateProvider';

const NameScratch = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
      </Head>
      <NextSeo
        title='NameScratch - Find expiring domains with ease.'
        description='NameScratch is an all-inclusive platform that allows domainers to search through expiring domains with ease.'
      />

      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
    </>
  );
};

export default NameScratch;

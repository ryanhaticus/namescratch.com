import { useEffect } from 'react';
import DomainComponent, { IDomain } from '../components/DomainTable';
import HeaderComponent from '../components/Header';
import Pagination from '../components/Pagination';
import { useGlobalState } from '../providers/GlobalStateProvider';

export interface IIndexPageProps {
  domains: IDomain[];
}

const IndexPage = ({ domains }: IIndexPageProps) => {
  const { setDomains } = useGlobalState();
  useEffect(() => {
    setDomains(domains);
  }, [domains]);
  return (
    <>
      <div className='container mx-auto px-6 lg:px-8 pb-8 lg:pb-16'>
        <HeaderComponent />
        <DomainComponent />
        <Pagination />
      </div>
    </>
  );
};

const getFormattedDate = (daysAhead: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const formattedDate = `${date.getMonth() + 1}-${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }-${date.getFullYear()}`;
  return formattedDate;
};

export const getStaticProps = async () => {
  const domains = [];

  const dates = [
    getFormattedDate(1),
    getFormattedDate(2),
    getFormattedDate(3),
    getFormattedDate(4),
  ];

  for (let date of dates) {
    const response = await fetch(`https://namejet.com/download/${date}.txt`);
    const text = await response.text();
    const tempDomains = text.split('\n');
    for (const domain of tempDomains) {
      let rating = 1;
      const domainNoTLD = domain.split('.')[0];
      if (domain.includes('.com')) {
        rating += 1;
      }
      if (domainNoTLD.length <= 6) {
        rating += 2;
      } else if (domainNoTLD.length <= 8) {
        rating += 1;
      }
      if (domainNoTLD.match(/^[a-zA-Z]+$/)) {
        rating += 1;
      }

      domains.push({
        domain,
        rating,
        expiry_date: date,
      });
    }
  }

  return {
    props: {
      domains,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default IndexPage;

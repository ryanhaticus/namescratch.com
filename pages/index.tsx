import { useEffect, useState } from 'react';
import DomainComponent, { IDomain } from '../components/DomainTable';
import HeaderComponent from '../components/Header';
import LoadingComponent from '../components/Loading';
import Pagination from '../components/Pagination';
import { useGlobalState } from '../providers/GlobalStateProvider';

const getFormattedDate = (daysAhead: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const formattedDate = `${date.getMonth() + 1}-${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }-${date.getFullYear()}`;
  return formattedDate;
};

const IndexPage = () => {
  const { setDomains } = useGlobalState();
  const [domains, _setDomains] = useState([]);

  useEffect(() => {
    (async () => {
      const dates = [
        getFormattedDate(-2),
        getFormattedDate(-1),
        getFormattedDate(0),
        getFormattedDate(1),
        getFormattedDate(2),
      ];
      for (let date of dates) {
        const response = await fetch(`/api/domains?date=${date}`);
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
      setDomains(domains);
    })();
  }, []);

  if (domains.length == 0) {
    return <LoadingComponent />;
  }

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

export default IndexPage;

import { createContext, useContext, useEffect, useState } from 'react';
import { IDomain } from '../components/DomainTable';

export interface IGlobalStateContextProps {
  keywords: string;
  setKeywords?: (keywords: string) => void;
  minLength: number;
  setMinLength?: (minLength: number) => void;
  maxLength: number;
  setMaxLength?: (maxLength: number) => void;
  setDomains?: (domains: IDomain[]) => void;
  filteredDomains: IDomain[];
  maxDisplayed: number;
  setMaxDisplayed?: (maxDisplayed: number) => void;
  page: number;
  setPage?: (page: number) => void;
  pagesAvailable: number;
  menuOpen: boolean;
  setMenuOpen?: (menuOpen: boolean) => void;
  allowNumbers: boolean;
  setAllowNumbers?: (allowNumbers: boolean) => void;
  allowHyphens: boolean;
  setAllowHyphens?: (allowHyphens: boolean) => void;
  numberOfResults: number;
}

const GlobalStateContext = createContext<IGlobalStateContextProps>({
  keywords: '',
  minLength: 0,
  maxLength: 0,
  filteredDomains: [],
  maxDisplayed: 0,
  page: 0,
  pagesAvailable: 0,
  menuOpen: false,
  allowNumbers: false,
  allowHyphens: false,
  numberOfResults: 0,
});

export const GlobalStateProvider = ({ children }) => {
  const [keywords, _setKeywords] = useState('');
  const [minLength, _setMinLength] = useState(0);
  const [maxLength, _setMaxLength] = useState(86);
  const [domains, _setDomains] = useState<IDomain[]>([]);
  const [filteredDomains, _setFilteredDomains] = useState<IDomain[]>([]);
  const [maxDisplayed, _setMaxDisplayed] = useState(10);
  const [page, _setPage] = useState(0);
  const [pagesAvailable, _setPagesAvailable] = useState(1);
  const [menuOpen, _setMenuOpen] = useState(false);
  const [allowNumbers, _setAllowNumbers] = useState(false);
  const [allowHyphens, _setAllowHyphens] = useState(false);
  const [numberOfResults, _setNumberOfResults] = useState(0);

  const setKeywords = (keywords: string) => {
    _setKeywords(keywords);
  };
  const setMinLength = (minLength: number) => {
    _setMinLength(minLength);
  };
  const setMaxLength = (maxLength: number) => {
    _setMaxLength(maxLength);
  };
  const setDomains = (domains: IDomain[]) => {
    _setDomains(domains);
  };
  const setMaxDisplayed = (maxDisplayed: number) => {
    _setMaxDisplayed(maxDisplayed);
  };
  const setPage = (page: number) => {
    _setPage(page);
  };
  const setMenuOpen = (menuOpen: boolean) => {
    _setMenuOpen(menuOpen);
  };
  const setAllowNumbers = (allowNumbers: boolean) => {
    _setAllowNumbers(allowNumbers);
  };
  const setAllowHyphens = (allowHyphens: boolean) => {
    _setAllowHyphens(allowHyphens);
  };

  useEffect(() => {
    if (domains.length === 0) {
      return;
    }

    let tempDomains = [...domains];
    tempDomains = tempDomains.filter(({ domain }) => {
      if (domain === '') {
        return false;
      }
      const domainNoTLD = domain.split('.')[0];
      return (
        (keywords === '' || domainNoTLD.includes(keywords)) &&
        (minLength === 0 || domainNoTLD.length >= minLength) &&
        (maxLength === 0 || domainNoTLD.length <= maxLength) &&
        (allowNumbers || !/\d/.test(domainNoTLD)) &&
        (allowHyphens || !/\-/.test(domainNoTLD))
      );
    });
    _setNumberOfResults(tempDomains.length);
    _setFilteredDomains(
      tempDomains.slice(page * maxDisplayed, (page + 1) * maxDisplayed)
    );
    _setPagesAvailable(Math.ceil(tempDomains.length / maxDisplayed));
  }, [
    domains,
    keywords,
    minLength,
    maxLength,
    page,
    maxDisplayed,
    allowHyphens,
    allowNumbers,
  ]);

  useEffect(() => {
    setPage(0);
  }, [domains, keywords, minLength, maxLength, maxDisplayed]);

  return (
    <GlobalStateContext.Provider
      value={{
        keywords,
        setKeywords,
        minLength,
        setMinLength,
        maxLength,
        setMaxLength,
        setDomains,
        filteredDomains,
        maxDisplayed,
        setMaxDisplayed,
        page,
        setPage,
        pagesAvailable,
        menuOpen,
        setMenuOpen,
        allowNumbers,
        setAllowNumbers,
        allowHyphens,
        setAllowHyphens,
        numberOfResults,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () =>
  useContext<IGlobalStateContextProps>(GlobalStateContext);

export default GlobalStateContext;

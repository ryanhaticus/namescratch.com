import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';
import { useGlobalState } from '../providers/GlobalStateProvider';

const Pagination = () => {
  const {
    pagesAvailable,
    page,
    setPage,
    filteredDomains,
    numberOfResults,
    maxDisplayed,
  } = useGlobalState();
  return (
    <div className='bg-white py-3 flex items-center justify-between'>
      <div className='w-full flex flex-col items-center gap-y-2 sm:gap-y-0 sm:flex-row sm:justify-between'>
        <div className='flex-grow'>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>{page * maxDisplayed + 1}</span> to{' '}
            <span className='font-medium'>
              {(page + 1) * maxDisplayed < numberOfResults
                ? (page + 1) * maxDisplayed
                : numberOfResults}
            </span>{' '}
            of <span className='font-medium'>{numberOfResults}</span> results
          </p>
        </div>
        <div className='w-full sm:w-auto'>
          <nav
            className='w-full relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => setPage(0)}
            >
              <span className='sr-only'>Previous</span>
              <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>

            {page - 1 >= 0 && (
              <button
                onClick={() => setPage(page - 1)}
                className='justify-center flex-grow bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              >
                {page}
              </button>
            )}

            <button
              aria-current='page'
              className='justify-center flex-grow z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            >
              {page + 1}
            </button>
            {page + 1 < pagesAvailable && (
              <button
                onClick={() => setPage(page + 1)}
                className='justify-center flex-grow text-center bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              >
                {page + 2}
              </button>
            )}

            <button
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={() => setPage(pagesAvailable - 1)}
            >
              <span className='sr-only'>Next</span>
              <ChevronDoubleRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

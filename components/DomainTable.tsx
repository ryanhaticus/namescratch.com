import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { useGlobalState } from '../providers/GlobalStateProvider';
import FilterComponent from './Filter';

export interface IDomain {
  domain: string;
  rating: number;
  expiry_date: string;
}

const TableComponent = () => {
  const { filteredDomains } = useGlobalState();
  return (
    <div>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Expiring Domains
          </h1>
          <p className='mt-2 text-lg text-gray-700'>
            Below is a complete list of domains that are set to expire soon.
          </p>
        </div>
      </div>
      <div className='mt-4'>
        <FilterComponent />
      </div>
      <div className='mt-8 flex flex-col'>
        <div>
          <div className='inline-block min-w-full py-2 align-middle'>
            <div className='rounded-lg overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr className='divide-x divide-gray-200'>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Domain
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      <div className='flex gap-x-1 '>
                        Scratch Rating{' '}
                        <div title='Domains are rated based on length, TLD, and composition.'>
                          <QuestionMarkCircleIcon
                            className='text-indigo-600 h-5 w-5'
                            aria-hidden='true'
                          />
                        </div>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      <div className='flex gap-x-1'>
                        Expiry Date
                        <div title='The date in which the listed domain becomes available to register.'>
                          <QuestionMarkCircleIcon className='text-indigo-600 h-5 w-5' />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {filteredDomains.map((domain) => (
                    <tr
                      key={domain.domain}
                      className='divide-x divide-gray-200'
                    >
                      <td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6'>
                        {domain.domain}
                      </td>
                      <td className='whitespace-nowrap p-4 text-sm text-gray-500'>
                        <div className='flex gap-x-1'>
                          {Array(domain.rating)
                            .fill(0)
                            .map((_, index) => (
                              <svg
                                key={index}
                                className='h-5 w-5 fill-current text-indigo-600'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z' />
                              </svg>
                            ))}
                        </div>
                      </td>
                      <td className='whitespace-nowrap p-4 text-sm text-gray-500'>
                        {domain.expiry_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

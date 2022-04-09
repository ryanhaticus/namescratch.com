import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import { useGlobalState } from '../providers/GlobalStateProvider';
import InputRange from 'react-input-range';

const FilterComponent = () => {
  const {
    domains,
    setKeywords,
    setStartsWith,
    setEndsWith,
    startsWith,
    endsWith,
    keywords,
    setMinLength,
    setMaxLength,
    minLength,
    maxLength,
    selectedTLDs,
    setSelectedTLDs,
  } = useGlobalState();

  const [availableTLDs, setAvailableTLDs] = useState([]);

  const keywordsRef = useRef<HTMLInputElement>(null);
  const startsWithRef = useRef<HTMLInputElement>(null);
  const endsWithRef = useRef<HTMLInputElement>(null);

  const [lengthSlider, setLengthSlider] = useState({
    min: 1,
    max: 80,
  });

  useEffect(() => {
    const { min, max } = lengthSlider;
    setMinLength(min);
    setMaxLength(max);
  }, [lengthSlider]);

  useEffect(() => {
    const tlds = domains.map(({ domain }) =>
      domain.split('.')[1] ? domain.split('.')[1].replace('\r', '') : null
    );
    const uniqueTLDs = [...new Set(tlds)];
    uniqueTLDs.pop();
    setAvailableTLDs(uniqueTLDs);
  }, [domains]);

  return (
    <>
      <div>
        <fieldset>
          <legend className='flex gap-x-1 text-sm font-medium text-gray-900'>
            <span>TLDs</span>
            <div title='Domains must end with a selected TLD.'>
              <QuestionMarkCircleIcon
                className='text-indigo-600 h-5 w-5'
                aria-hidden='true'
              />
            </div>
          </legend>
          <div className='flex gap-x-3 mt-1'>
            {availableTLDs.map((tld) => (
              <div key={tld} className='flex'>
                <div className='text-sm mr-2'>
                  <label
                    htmlFor={`tld-${tld}`}
                    className='font-medium text-gray-700 select-none'
                  >
                    {tld}
                  </label>
                </div>
                <div className='flex items-center h-5'>
                  <input
                    id={`tld-${tld}`}
                    name={`tld-${tld}`}
                    type='checkbox'
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedTLDs([...selectedTLDs, tld])
                        : setSelectedTLDs(selectedTLDs.filter((k) => k !== tld))
                    }
                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className='mt-2'>
        <label
          htmlFor='keywords'
          className='flex gap-x-1 text-sm font-medium text-gray-700'
        >
          Keywords{' '}
          <div title='Domains must contain each listed keyword.'>
            <QuestionMarkCircleIcon
              className='text-indigo-600 h-5 w-5'
              aria-hidden='true'
            />
          </div>
        </label>
        <div className='mt-1'>
          <input
            type='text'
            name='keywords'
            id='keywords'
            ref={keywordsRef}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') {
                return;
              }
              const newKeywords = [...keywords, keywordsRef.current.value];
              keywordsRef.current.value = '';
              setKeywords(newKeywords);
            }}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            placeholder='ex: baking, crypto, etc.'
          />
        </div>{' '}
        {keywords.length > 0 && (
          <div className='flex gap-x-2 py-1'>
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className='inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700'
              >
                {keyword}
                <button
                  type='button'
                  onClick={() =>
                    setKeywords(keywords.filter((k) => k !== keyword))
                  }
                  className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white'
                >
                  <span className='sr-only'>Remove {keyword} filter</span>
                  <svg
                    className='h-2 w-2'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 8 8'
                  >
                    <path
                      strokeLinecap='round'
                      strokeWidth='1.5'
                      d='M1 1l6 6m0-6L1 7'
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className='flex gap-x-2 mt-2'>
        <div className='flex-grow'>
          <label
            htmlFor='startswith'
            className='flex gap-x-1 text-sm font-medium text-gray-700'
          >
            Starts with{' '}
            <div title='Domains must start with at least one listed value.'>
              <QuestionMarkCircleIcon
                className='text-indigo-600 h-5 w-5'
                aria-hidden='true'
              />
            </div>
          </label>

          <div className='mt-1'>
            <input
              type='text'
              name='startswith'
              id='startswith'
              ref={startsWithRef}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') {
                  return;
                }
                const newStartsWith = [
                  ...startsWith,
                  startsWithRef.current.value,
                ];
                startsWithRef.current.value = '';
                setStartsWith(newStartsWith);
              }}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='ex: get, join, etc.'
            />
          </div>
          {startsWith.length > 0 && (
            <div className='flex gap-x-2 py-1'>
              {startsWith.map((start) => (
                <span
                  key={start}
                  className='inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700'
                >
                  {start}
                  <button
                    type='button'
                    onClick={() =>
                      setStartsWith(startsWith.filter((k) => k !== start))
                    }
                    className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white'
                  >
                    <span className='sr-only'>Remove {start} filter</span>
                    <svg
                      className='h-2 w-2'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 8 8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeWidth='1.5'
                        d='M1 1l6 6m0-6L1 7'
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className='flex-grow'>
          <label
            htmlFor='endswith'
            className='flex gap-x-1 text-sm font-medium text-gray-700'
          >
            Ends with{' '}
            <div title='Domains must end with at least one listed value.'>
              <QuestionMarkCircleIcon
                className='text-indigo-600 h-5 w-5'
                aria-hidden='true'
              />
            </div>
          </label>

          <div className='mt-1'>
            <input
              type='text'
              name='endswith'
              id='endswith'
              ref={endsWithRef}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') {
                  return;
                }
                const newEndsWith = [...endsWith, endsWithRef.current.value];
                endsWithRef.current.value = '';
                setEndsWith(newEndsWith);
              }}
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='ex: ly, ify, etc.'
            />
          </div>
          {endsWith.length > 0 && (
            <div className='flex gap-x-2 py-1'>
              {endsWith.map((end) => (
                <span
                  key={end}
                  className='inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700'
                >
                  {end}
                  <button
                    type='button'
                    onClick={() =>
                      setEndsWith(endsWith.filter((k) => k !== end))
                    }
                    className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white'
                  >
                    <span className='sr-only'>Remove {end} filter</span>
                    <svg
                      className='h-2 w-2'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 8 8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeWidth='1.5'
                        d='M1 1l6 6m0-6L1 7'
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='mt-2'>
        <label className='mb-5 flex gap-x-1 text-sm font-medium text-gray-700'>
          Domain Length{' '}
          <div title='The domain must be between X and Y characters long.'>
            <QuestionMarkCircleIcon
              className='text-indigo-600 h-5 w-5'
              aria-hidden='true'
            />
          </div>
        </label>
        <div className='px-9'>
          <InputRange
            maxValue={80}
            minValue={1}
            formatLabel={(value) => `${value} characters`}
            value={lengthSlider}
            onChange={(value: any) => setLengthSlider(value)}
          />
        </div>
      </div>
    </>
  );
};

export default FilterComponent;

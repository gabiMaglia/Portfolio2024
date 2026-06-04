'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import PropTypes from 'prop-types';

export default function LocaleSwitcher({className = ''}) {
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const pathname = usePathname();
  const [isSwitching, setIsSwitching] = useState(false);

 
  useEffect(() => {
    if (isSwitching) setIsSwitching(false);
    
  }, [pathname]);

  useEffect(() => {
    if (!isSwitching) return;
    const id = setTimeout(() => setIsSwitching(false), 6000);
    return () => clearTimeout(id);
  }, [isSwitching]);

  return (
    <>
      <Link
        href={`/${otherLocale}`}
        locale={otherLocale}
        prefetch
        onClick={() => setIsSwitching(true)}
        aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
      >
        <button
          type="button"
          className={`flex items-center justify-center w-8 h-8 rounded-full font-Ovo
                      ${isSwitching ? 'opacity-60 pointer-events-none' : ''}
                      bg-black text-white dark:bg-white dark:text-black ${className}`}
          aria-busy={isSwitching}
          tabIndex={-1}
          disabled={isSwitching}
        >
          {isSwitching ? (
            <span className="block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
          ) : (
            <p className='text-sm'>{otherLocale.toUpperCase()}</p>
          )}
        </button>
      </Link>

      {isSwitching && (
        <div
          className="absolute inset-0 z-[9999] grid place-items-center bg-black/50 backdrop-blur-sm
                     transition-opacity duration-200 opacity-100"
          aria-hidden="true"
        >
     
        </div>
      )}
    </>
  );
}

LocaleSwitcher.propTypes = {
  className: PropTypes.string
};

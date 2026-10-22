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
        aria-busy={isSwitching}
        className={`locale-switch ${className}`.trim()}
      >
        {isSwitching ? (
          <span className="locale-spinner" />
        ) : (
          <span>{otherLocale.toUpperCase()}</span>
        )}
      </Link>

      {isSwitching && <div className="locale-overlay" aria-hidden="true" />}
    </>
  );
}

LocaleSwitcher.propTypes = {
  className: PropTypes.string
};

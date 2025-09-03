'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {locales} from '@/i18n/settings';

export default function LocaleSwitcher({current}) {
  const pathname = usePathname(); // ej /es/work
  const parts = pathname.split('/');
  const base = parts.slice(2).join('/'); // quita /:locale

  return (
    <div className="flex gap-2">
      {locales.map((lng) => (
        <Link
          key={lng}
          href={`/${lng}/${base}`}
          className={`px-3 py-1 rounded-full border ${lng === current ? 'bg-white/10 border-white' : 'border-gray-400'}`}
        >
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

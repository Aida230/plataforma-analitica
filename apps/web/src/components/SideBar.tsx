'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/kpis', label: 'KPIs' },
  { href: '/dashboard/reportes', label: 'Reportes' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 text-sm font-semibold text-gray-500 uppercase">Menú</div>
      <nav className="flex flex-col gap-1">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + '/');
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded transition-colors ${
                active ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

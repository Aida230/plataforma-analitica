'use client'; // Necesario porque usamos hooks en el cliente

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-1 rounded transition-colors ${
      pathname === path
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold text-gray-800">📊 Plataforma Analítica</h1>
        <nav className="flex gap-3">
          <Link href="/" className={linkClass('/')}>Inicio</Link>
          <Link href="/about" className={linkClass('/about')}>Sobre</Link>
        </nav>
      </div>
    </header>
  );
}

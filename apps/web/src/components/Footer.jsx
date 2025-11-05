'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-white text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-2">
        {/* Izquierda */}
        <p className="text-center sm:text-left">
          © {year} Plataforma de Análisis de Datos · Todos los derechos reservados
        </p>

        {/* Derecha */}
        <nav className="flex flex-wrap justify-center gap-4 text-gray-500">
          <Link href="/about" className="hover:text-brand-700 transition-colors">
            Sobre
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            Privacidad
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  );
}

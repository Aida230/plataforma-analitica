import type { ReactNode } from 'react';
import Sidebar from '@/components/SideBar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar: arriba en móvil, a la izquierda en desktop */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r">
        {/* si tu Sidebar ya tiene padding, no añadas más aquí */}
        <Sidebar />
      </aside>

      {/* Contenido: rellena y respira */}
      <main className="flex-1 p-4 md:p-6">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

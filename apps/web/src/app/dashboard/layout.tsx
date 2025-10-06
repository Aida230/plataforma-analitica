import type { ReactNode } from 'react';
import Sidebar from '@/components/SideBar';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-[240px_1fr]">
      <Sidebar />
      <section className="p-6">{children}</section>
    </div>
  );
}

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
export const metadata = {
  title: 'Plataforma Analítica',
  description: 'Dashboard de KPIs empresariales',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

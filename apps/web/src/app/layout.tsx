import "./globals.css";

export const metadata = {
  title: "Plataforma Analítica",
  description: "Dashboard de KPIs empresariales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <header className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">📊 Plataforma Analítica</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

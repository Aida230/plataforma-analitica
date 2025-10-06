import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700">Sobre esta plataforma</h1>
      <p className="mt-4 max-w-md text-center text-gray-600">
        Esta es una página adicional creada para aprender cómo Next.js genera rutas automáticamente.
      </p>
      <Link
        href="/"
        className="mt-6 text-blue-500 underline hover:text-blue-700 transition-colors"
        >
          Volver a Home
        </Link>
    </main>
  );
}

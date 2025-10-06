import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        ¡Hola mundo desde mi app Next.js!
      </h1>
      <p className="mt-4 text-gray-700">
        Esta es mi primera página construida desde cero con Next y TypeScript ✨
      </p>

      <Link
        href="/about"
        className="mt-6 text-blue-500 underline hover:text-blue-700 transition-colors"
      >
        Ir a la página "sobre esta plataforma"
      </Link>
    </main>
  );
}

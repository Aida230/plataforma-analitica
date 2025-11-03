import Link from 'next/link';

export const metadata = {
  title: 'Sobre esta plataforma',
  description: 'Dashboard de KPIs, series temporales y reportes para equipos de negocio.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* 1) Hero corto */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Sobre esta plataforma</h1>
          <p className="text-lg text-gray-600">
            Dashboard interactivo de KPIs y reportes diseñado para equipos de negocio.
          </p>
          <p className="text-gray-600">
            Centraliza indicadores clave (tráfico, ventas, engagement y adquisición) en un único
            lugar, con visualizaciones claras y exportaciones sencillas.
          </p>
        </section>

        {/* 2) Para quién */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">¿Para quién?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Ejecutivos">
              Visualiza los KPIs más relevantes de un vistazo para tomar decisiones rápidas.
            </Card>
            <Card title="Analistas">
              Profundiza en datos con series temporales y reportes detallados.
            </Card>
            <Card title="Administradores">
              Gestiona fuentes de datos, permisos y usuarios de forma segura.
            </Card>
          </div>
        </section>

        {/* 3) Qué incluye (MVP) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Qué incluye (MVP)</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
            <Li>Dashboard general con resumen de KPIs.</Li>
            <Li>KPIs detallados por categoría (mock actual).</Li>
            <Li>Reportes con historial y exportaciones simuladas.</Li>
            <Li>Diseño responsivo con Tailwind.</Li>
            <Li>Estructura preparada para APIs reales.</Li>
          </ul>
        </section>

        {/* 4) Tecnologías */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Tecnologías</h2>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'TailwindCSS', 'Express', 'Prisma', 'PostgreSQL', 'Recharts'].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl bg-white shadow text-sm text-gray-700"
              >
                {t}
              </span>
            ))}
            <span className="px-3 py-1 rounded-xl bg-white shadow text-sm text-gray-400">
              Próximamente: GA4, Shopify…
            </span>
          </div>
        </section>

        {/* 5) Roadmap */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Roadmap</h2>
          <ol className="space-y-2 text-gray-700">
            <Li>Conexión con APIs reales (GA4, Shopify).</Li>
            <Li>Filtros por fechas, granularidad y fuentes.</Li>
            <Li>Exportaciones reales (CSV, PDF).</Li>
            <Li>Sistema de login y roles.</Li>
            <Li>Alertas y visualizaciones avanzadas.</Li>
          </ol>
        </section>

        {/* 6) CTA final */}
        <section className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Explora el dashboard</h3>
          <p className="text-gray-600 text-sm">
            Datos de ejemplo — pronto: integración con Google Analytics y Shopify.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Ir al Dashboard
          </Link>
        </section>
      </div>
    </div>
  );
}

/* ---------- Subcomponentes locales (presentacionales) ---------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-white rounded-xl shadow p-3 text-sm">{children}</li>
  );
}

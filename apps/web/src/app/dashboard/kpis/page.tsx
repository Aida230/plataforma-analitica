'use client';
/**
 * Página KPIs (detalle)
 * - Hereda el layout de /dashboard automáticamente.
 * - Maquetación con Tailwind.
 * - Usa datos mock por ahora (sin llamadas a API).
 * - Incluye:
 *   1) Encabezado + descripción
 *   2) Bloque de "controles" (placeholder)
 *   3) Secciones por categoría con tarjetas KPI
 *   4) Placeholders de gráficos/tablas
 */

import React from 'react';

// ---------------------------
// Helpers de formato (mock)
// ---------------------------
const fmtPercent = (n: number) => `${Math.round(n * 100)}%`;
const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

// ---------------------------
// Datos mock (mismos nombres
// que los del backend para
// que luego sea fácil conectar)
// ---------------------------
const mock = {
  traffic: {
    sessions: 1200,
    users: 800,
    pageviews: 5000,
    bounceRate: 0.42,
    averageTimeOnPageSeconds: 62,
  },
  acquisition: {
    leads: 85,
    clickThroughRate: 0.032,
  },
  sales: {
    orders: 45,
    revenue: 2500,
    conversionRate: 0.037,
  },
  engagement: {
    returningUsers: 320,
    totalEvents: 4100,
  },
};

// ---------------------------
// UI: Tarjeta KPI simple
// ---------------------------
function KpiCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl p-4 shadow bg-white">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-gray-400">{hint}</div> : null}
    </div>
  );
}

// ---------------------------
// UI: Bloque (título + contenido)
// ---------------------------
function Section({
  title,
  children,
  description,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="text-sm text-gray-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

// ---------------------------
// UI: Placeholder gráfico
// (para reservar espacio)
// ---------------------------
function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-center h-64">
      <div className="text-gray-500 text-sm">
        {label} — <span className="text-gray-400">gráfico (próximamente)</span>
      </div>
    </div>
  );
}

// ---------------------------
// Página
// ---------------------------
export default function KpisPage() {
  // 🔜 Más adelante: leerá params (fechas, granularidad) y hará fetch a /kpis/*
  // Por ahora solo maquetación con mock.

  return (
    <div className="space-y-8">
      {/* 1) Encabezado */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">KPIs detallados</h1>
        <p className="text-gray-600">
          Métricas desglosadas por categoría para analizar rendimiento con mayor precisión.
        </p>
      </header>

      {/* 2) Controles (placeholder) */}
      <div className="bg-white rounded-2xl p-4 shadow flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-500">
          Controles de filtrado (próximamente): rango, granularidad, fuente…
        </span>
      </div>

      {/* 3) Categorías */}
      <div className="space-y-10">

        {/* Tráfico */}
        <Section
          title="Tráfico"
          description="Volumen y calidad de las visitas: sesiones, usuarios y comportamiento."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard title="Sesiones" value={mock.traffic.sessions} />
            <KpiCard title="Usuarios" value={mock.traffic.users} />
            <KpiCard title="Páginas vistas" value={mock.traffic.pageviews} />
            <KpiCard title="Rebote" value={fmtPercent(mock.traffic.bounceRate)} />
            <KpiCard
              title="Tiempo medio"
              value={`${mock.traffic.averageTimeOnPageSeconds}s`}
              hint="Promedio por página"
            />
          </div>
          <ChartPlaceholder label="Tráfico por fecha" />
        </Section>

        {/* Adquisición */}
        <Section
          title="Adquisición"
          description="Eficiencia de captación: leads y ratio de clics."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Leads" value={mock.acquisition.leads} />
            <KpiCard title="CTR" value={fmtPercent(mock.acquisition.clickThroughRate)} />
          </div>
          <ChartPlaceholder label="Leads por canal" />
        </Section>

        {/* Ventas */}
        <Section
          title="Ventas"
          description="Pedidos e ingresos generados, y su eficiencia."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Pedidos" value={mock.sales.orders} />
            <KpiCard title="Ingresos" value={fmtCurrency(mock.sales.revenue)} />
            <KpiCard title="Conversión" value={fmtPercent(mock.sales.conversionRate)} />
          </div>
          <ChartPlaceholder label="Pedidos e ingresos por fecha" />
        </Section>

        {/* Engagement */}
        <Section
          title="Engagement"
          description="Fidelidad e interacción con el contenido."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Usuarios recurrentes" value={mock.engagement.returningUsers} />
            <KpiCard title="Eventos totales" value={mock.engagement.totalEvents} />
          </div>
          <ChartPlaceholder label="Eventos por tipo" />
        </Section>
      </div>

      {/* 4) Placeholder tablas/comparativas */}
      <Section
        title="Comparativas y tablas"
        description="Segmentaciones, top páginas/canales, y detalles exportables."
      >
        <div className="bg-white rounded-2xl p-6 shadow text-sm text-gray-500">
          Aquí irán tablas y comparativas detalladas (próximamente).
        </div>
      </Section>
    </div>
  );
}

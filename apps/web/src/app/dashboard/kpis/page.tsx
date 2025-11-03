'use client';
/**
 * KPIs detallados — Página muy ligera:
 * - Encabezado
 * - Secciones por categoría (Tráfico, Adquisición, Ventas, Engagement)
 * - Sin lógica de datos aquí: solo contenido y composición de componentes
 */

import React from 'react';
import Section from './_components/Section';
import KpiCard from './_components/KpiCard';
import ChartPlaceholder from './_components/ChartPlaceholder';
import { mockKpis } from './_data/mock';
import { fmtPercent, fmtCurrency } from './_lib/format';

export default function KpisPage() {
  const s = mockKpis; // 🔜 más adelante, cambiaremos a datos reales

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">KPIs detallados</h1>
        <p className="text-gray-600">
          Métricas desglosadas por categoría para analizar el rendimiento con mayor precisión.
        </p>
      </header>

      {/* Controles (placeholder) */}
      <div className="bg-white rounded-2xl p-4 shadow flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-500">
          Controles de filtrado (próximamente): rango, granularidad, fuente…
        </span>
      </div>

      {/* Categorías */}
      <div className="space-y-10">
        {/* Tráfico */}
        <Section
          title="Tráfico"
          description="Volumen y calidad de las visitas: sesiones, usuarios y comportamiento."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard title="Sesiones" value={s.traffic.sessions} />
            <KpiCard title="Usuarios" value={s.traffic.users} />
            <KpiCard title="Páginas vistas" value={s.traffic.pageviews} />
            <KpiCard title="Rebote" value={fmtPercent(s.traffic.bounceRate)} />
            <KpiCard title="Tiempo medio" value={`${s.traffic.averageTimeOnPageSeconds}s`} hint="Promedio por página" />
          </div>
          <ChartPlaceholder label="Tráfico por fecha" />
        </Section>

        {/* Adquisición */}
        <Section title="Adquisición" description="Eficiencia de captación: leads y ratio de clics.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Leads" value={s.acquisition.leads} />
            <KpiCard title="CTR" value={fmtPercent(s.acquisition.clickThroughRate)} />
          </div>
          <ChartPlaceholder label="Leads por canal" />
        </Section>

        {/* Ventas */}
        <Section title="Ventas" description="Pedidos e ingresos generados, y su eficiencia.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Pedidos" value={s.sales.orders} />
            <KpiCard title="Ingresos" value={fmtCurrency(s.sales.revenue)} />
            <KpiCard title="Conversión" value={fmtPercent(s.sales.conversionRate)} />
          </div>
          <ChartPlaceholder label="Pedidos e ingresos por fecha" />
        </Section>

        {/* Engagement */}
        <Section title="Engagement" description="Fidelidad e interacción con el contenido.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Usuarios recurrentes" value={s.engagement.returningUsers} />
            <KpiCard title="Eventos totales" value={s.engagement.totalEvents} />
          </div>
          <ChartPlaceholder label="Eventos por tipo" />
        </Section>
      </div>

      {/* Comparativas/tablas (placeholder) */}
      <Section title="Comparativas y tablas" description="Segmentaciones, top páginas/canales y detalles exportables.">
        <div className="bg-white rounded-2xl p-6 shadow text-sm text-gray-500">
          Aquí irán tablas y comparativas detalladas (próximamente).
        </div>
      </Section>
    </div>
  );
}

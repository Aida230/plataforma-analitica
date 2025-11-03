'use client';

import ReportsHeader from './_components/ReportsHeader';
import Section from './_components/Section';
import ActionCard from './_components/ActionCard';
import ExportQuickActions from './_components/ExportQuickActions';
import ReportsHistoryTable from './_components/ReportsHistoryTable';
import { mockHistory } from './_data/mock';

export default function ReportesPage() {
  return (
    <div className="space-y-8">
      <ReportsHeader />

      <Section
        title="Generar reportes"
        description="Plantillas rápidas para crear informes. (Acciones de ejemplo, aún sin lógica)"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionCard
            title="Resumen semanal"
            description="Usuarios, ventas, conversión y gráfico de la última semana."
            actionLabel="Generar PDF"
          />
          <ActionCard
            title="KPIs detallados"
            description="Tráfico, adquisición, ventas y engagement con más granularidad."
            actionLabel="Generar PDF"
          />
          <ActionCard
            title="Series temporales"
            description="Exporta la evolución diaria/semanal/mensual en formato CSV."
            actionLabel="Generar CSV"
          />
        </div>
      </Section>

      <Section
        title="Exportaciones rápidas"
        description="Atajos para descargar datasets sin configurar reportes."
      >
        <ExportQuickActions />
      </Section>

      <Section
        title="Historial de reportes"
        description="Tus últimas descargas generadas desde esta sección."
      >
        <ReportsHistoryTable rows={mockHistory} />
      </Section>
    </div>
  );
}

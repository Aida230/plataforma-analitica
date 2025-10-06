import KpiCard from '@/components/KpiCard';
import ChartExample from '@/components/ChartExample';


export default function DashboardHome() {
  const kpis = [
    { title: 'Usuarios', value: 1240, trend: '+12%' },
    { title: 'Ventas', value: '$32,800', trend: '+5%' },
    { title: 'Tasa de conversión', value: '3.7%', trend: '-0.4%' },
    { title: 'Tiempo medio en página', value: '2m 15s' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Resumen de KPIs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      
      <ChartExample />
    </div>
  );
}

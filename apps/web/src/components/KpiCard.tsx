type KpiCardProps = {
  title: string;
  value: string | number;
  trend?: string; // opcional, para poner una flecha o porcentaje
  icon?: React.ReactNode; // si luego quieres meter iconos
};

export default function KpiCard({ title, value, trend, icon }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="text-2xl font-semibold text-gray-900">{value}</div>

      {trend && (
        <div
          className={`text-sm ${
            trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend}
        </div>
      )}
    </div>
  );
}

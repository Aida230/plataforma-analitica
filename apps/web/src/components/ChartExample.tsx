'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { date: 'Lun', value: 320 },
  { date: 'Mar', value: 450 },
  { date: 'Mié', value: 380 },
  { date: 'Jue', value: 520 },
  { date: 'Vie', value: 610 },
  { date: 'Sáb', value: 580 },
  { date: 'Dom', value: 640 },
];

export default function ChartExample() {
  return (
    <div className="w-full h-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Sesiones (últimos 7 días)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopOpacity={0.3} />
              <stop offset="95%" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#areaFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

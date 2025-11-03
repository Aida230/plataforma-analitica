'use client';
import React from 'react';

/**
 * Placeholder de gráfico para reservar espacio y mantener el layout estable
 * hasta que integremos Recharts (o el componente que prefieras).
 */
export default function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-center h-64">
      <div className="text-gray-500 text-sm">
        {label} — <span className="text-gray-400">gráfico (próximamente)</span>
      </div>
    </div>
  );
}

'use client';
import React from 'react';

/**
 * Tarjeta sencilla para mostrar un KPI.
 * - title: etiqueta
 * - value: número o string ya formateado (p.ej. "42%" o "2.500,00 €")
 * - hint: pie opcional con contexto
 */
export default function KpiCard({
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
      <div className="mt-1 text-2xl font-semibold text-gray-700">{value}</div>
      {hint ? <div className="mt-1 text-xs text-gray-400">{hint}</div> : null}
    </div>
  );
}

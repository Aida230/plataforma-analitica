'use client';
export default function ExportQuickActions() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow flex flex-wrap gap-3">
      {[
        { label: 'Exportar resumen (PDF)' },
        { label: 'Exportar timeseries (CSV)' },
        { label: 'Exportar KPIs (CSV)' },
      ].map((b) => (
        <button
          key={b.label}
          type="button"
          className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          disabled
          title="Próximamente"
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}

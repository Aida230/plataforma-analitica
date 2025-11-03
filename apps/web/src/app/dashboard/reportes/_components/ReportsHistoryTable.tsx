'use client';
import { ReportItem } from '../_data/mock';

export default function ReportsHistoryTable({ rows }: { rows: ReportItem[] }) {
  return (
    <div className="bg-white rounded-2xl p-0 overflow-hidden shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Formato</th>
            <th className="px-4 py-3">Tamaño</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-3 font-mono">{r.id}</td>
              <td className="px-4 py-3">{r.name}</td>
              <td className="px-4 py-3">{r.when}</td>
              <td className="px-4 py-3">{r.format}</td>
              <td className="px-4 py-3">{r.size}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                  title="Descarga de ejemplo (próximamente)"
                  disabled
                >
                  Descargar
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-center text-gray-500" colSpan={6}>
                Aún no hay reportes generados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

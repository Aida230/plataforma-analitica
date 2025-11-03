'use client';
export default function ActionCard({
  title, description, actionLabel,
}: { title: string; description: string; actionLabel: string }) {
  return (
    <div className="rounded-2xl p-4 shadow bg-white flex flex-col">
      <div className="text-base font-semibold">{title}</div>
      <p className="text-sm text-gray-500 mt-1 flex-1">{description}</p>
      <div className="mt-4">
        <button
          type="button"
          className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          disabled
          title="Próximamente"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

'use client';
import React from 'react';

/**
 * Contenedor semántico con título + descripción + contenido.
 * Mantiene coherencia visual entre secciones (Tráfico, Ventas, etc.).
 */
export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="text-sm text-gray-500">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

'use client';
import React from 'react';

/**
 * Contenedor semántico con título + descripción + contenido.
 * Igual que el usado en KPIs, pero local a "reportes" para no acoplar módulos.
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

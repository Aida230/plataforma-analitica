'use client';
import React from 'react';
import Link from 'next/link';

/**
 * Página de inicio (Home)
 * - Hero principal con título, subtítulo y CTAs
 * - Sección de Highlights (3 bloques)
 * - CTA final
 */
export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8 px-6 py-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Plataforma de análisis de datos
          </h1>
          <p className="text-gray-600 text-lg">
            KPIs clave, series temporales y reportes en un solo lugar.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
            >
              Ir al Dashboard
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl border border-brand-200 text-brand-700 text-sm font-medium hover:bg-brand-50"
            >
              Login
            </Link>
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Saber más
            </Link>
          </div>
        </div>

        {/* Imagen o mock visual */}
        <div className="hidden md:flex items-center justify-center">
          <div className="bg-white shadow rounded-2xl p-8 w-80 h-48 flex flex-col justify-center text-center">
            <p className="text-gray-500 text-sm mb-2">Ejemplo visual</p>
            <div className="h-2 bg-gray-200 rounded mb-1"></div>
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            <div className="h-2 bg-gray-200 rounded mb-1"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Analiza, entiende y actúa
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HighlightCard
            title="KPIs clave"
            text="Sesiones, usuarios, ventas y conversión de un vistazo."
          />
          <HighlightCard
            title="Series temporales"
            text="Evolución diaria, semanal o mensual para detectar tendencias."
          />
          <HighlightCard
            title="Reportes y exportación"
            text="Descarga informes CSV o PDF y consulta tu historial."
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Empieza a analizar tus datos hoy
          </h2>
          <p className="text-gray-600 text-sm">
            Datos de ejemplo — pronto: integración con Google Analytics y Shopify.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
          >
            Abrir Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

/** Tarjeta de highlight reutilizable */
function HighlightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

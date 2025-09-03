import { z } from 'zod';

/**
 * Validamos las fechas de dos foras comunes:
 * -ISO completo: 2025-09-03:00:00.00z (z.string().datatime())
 * -Solo dia: 2025-09-03 (regex YYYY-MM-DD)
 * 
 * Ambas son ocionales, porque sus controladores ya tienen valores por defecto
 */

const isoDay = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Usa formato YYYY-MM-DD")

const isoFull = z.string().datetime(); 

// Aceptamos uno u otro, o nada
const isoDateFlexible = z.union([isoDay, isoFull]).optional();

const granularity = z.enum(["day", "week", "month"]).optional();

export const KpiSchemas = {
  summary: {
    query: z.object({
      start: isoDateFlexible,
      end: isoDateFlexible,
    })
    .optional(),
  },

  timeseries: {
    query: z.object({
      start: isoDateFlexible,
      end: isoDateFlexible,
      granularity,
    })
    .optional(),
  }
}
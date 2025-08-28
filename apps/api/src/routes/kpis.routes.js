import { Router } from 'express'
import { getKpiSummary, getKpiTimeseries } from '../controllers/kpis.controller.js'

// Creamos un enrutador específico para KPIs.
// Todas las rutas definidas aquí se montarán bajo el prefijo elegido en el agregador (ver Paso 3).
export const kpisRouter = Router()

// GET /kpis/summary
// Devuelve un resumen agregado de KPIs.
// Puede aceptar parámetros de consulta "start" y "end" (ISO), que por ahora no filtran (mock),
// pero preparamos la estructura para que, al conectar datos reales, la lógica ya esté lista.
kpisRouter.get('/summary', getKpiSummary)

// GET /kpis/timeseries
// Devuelve una serie temporal para gráficos (líneas, barras, etc.).
// Acepta "start", "end" y "granularity" (day | week | month), con valores por defecto razonables.
kpisRouter.get('/timeseries', getKpiTimeseries)
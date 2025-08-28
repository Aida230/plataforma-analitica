// Esta función auxiliar intenta convertir un valor a Date. Si no puede, retorna null.
// Es útil para validar parámetros de consulta (query params) como "start" y "end".
function parseISOorNull(possibleDateValue) {
  const parsedDate = new Date(possibleDateValue)
  const isInvalidDate = Number.isNaN(parsedDate.getTime())
  return isInvalidDate ? null : parsedDate
}

// Controlador: GET /kpis/summary
// Objetivo: devolver un resumen de KPIs en formato JSON.
// Parámetros opcionales: start (fecha ISO), end (fecha ISO) — por ahora no filtran (mock),
// pero se parsean para que, cuando conectemos datos reales, el código ya esté preparado.
export async function getKpiSummary(req, res, next) {
  try {
    const { start, end } = req.query

    // Convertimos parámetros a fechas (o null si son inválidos)
    const startDate = start ? parseISOorNull(start) : null
    const endDate = end ? parseISOorNull(end) : null

    // Valores de ejemplo (mock). En el futuro vendrán de base de datos, CSV o APIs.
    const kpiSummary = {
      traffic: {
        sessions: 1200,
        users: 800,
        pageviews: 5000,
        bounceRate: 0.42,
        averageTimeOnPageSeconds: 62
      },
      acquisition: {
        leads: 85,
        clickThroughRate: 0.032
      },
      sales: {
        orders: 45,
        revenue: 2500,
        conversionRate: 0.037
      },
      engagement: {
        returningUsers: 320,
        totalEvents: 4100
      }
    }

    // Devolvemos un objeto que incluye el rango (si se proporcionó) y el resumen.
    res.json({
      range: {
        start: startDate ? startDate.toISOString() : null,
        end: endDate ? endDate.toISOString() : null
      },
      summary: kpiSummary
    })
  } catch (err) {
    // Delegamos el error al middleware de manejo de errores de Express.
    next(err)
  }
}

// Controlador: GET /kpis/timeseries
// Objetivo: devolver una serie temporal de KPIs entre un rango de fechas y con una granularidad específica.
// Parámetros opcionales:
// - start (fecha ISO; por defecto ahora mismo: hoy - 6 días)
// - end (fecha ISO; por defecto ahora mismo: hoy)
// - granularity (string: "day" | "week" | "month"; por defecto "day")
export async function getKpiTimeseries(req, res, next) {
  try {
    const { start, end, granularity = 'day' } = req.query

    // Si no vienen fechas válidas, definimos un rango de 7 días (mock).
    const fallbackStartDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    const fallbackEndDate = new Date()

    const startDate = parseISOorNull(start) ?? fallbackStartDate
    const endDate = parseISOorNull(end) ?? fallbackEndDate

    // Determinamos el tamaño del paso en milisegundos según la granularidad solicitada.
    // Esto nos permite generar puntos en la serie con ese intervalo.
    const millisecondsPerStep =
      granularity === 'week'  ? 7  * 24 * 60 * 60 * 1000 :
      granularity === 'month' ? 30 * 24 * 60 * 60 * 1000 :
                                24 * 60 * 60 * 1000 // "day" por defecto

    // Construimos la serie temporal (mock determinista para que sea estable por fecha)
    const timeSeriesRows = []
    for (let timestamp = startDate.getTime(); timestamp <= endDate.getTime(); timestamp += millisecondsPerStep) {
      const currentDate = new Date(timestamp)

      // Generamos una "semilla" determinista basada en la fecha (año/mes/día) para simular variaciones.
      const seed =
        (currentDate.getUTCFullYear() * 10000) +
        ((currentDate.getUTCMonth() + 1) * 100) +
        currentDate.getUTCDate()

      // Valores pseudoaleatorios pero estables para cada día/semana/mes (mock)
      const sessions = 120 + (seed % 50)
      const users = 80 + (seed % 40)
      const pageviews = sessions * (2 + (seed % 3))
      const orders = Math.floor(sessions * 0.04)
      const revenue = orders * (40 + (seed % 20))

      timeSeriesRows.push({
        dateISO: currentDate.toISOString().slice(0, 10), // "YYYY-MM-DD"
        sessions,
        users,
        pageviews,
        orders,
        revenue
      })
    }

    res.json({
      range: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        granularity
      },
      series: timeSeriesRows
    })
  } catch (err) {
    next(err)
  }
}

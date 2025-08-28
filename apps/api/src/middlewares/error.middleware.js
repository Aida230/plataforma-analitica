export function errorMiddleware(err, req, res, next) {
  console.error('❌ Unhandled error:', err)
  // Evita filtrar detalles sensibles en producción
  const message = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : String(err?.message || err)
  res.status(500).json({ error: message })
}

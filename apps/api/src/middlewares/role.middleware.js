// Middleware de autorización por rol
// Uso: requireRole('ADMIN'), requireRole('ADMIN','ANALYST')
// En ese caso, dentro de esta función, el parámetro allowed será ['ADMIN'] o ['ADMIN','ANALYST'].
// depende de lo que pases al usarlo)

export function requireRole(...allowed) {
  return (req, res, next) => {
    const role = req.user?.role // <- lo puso requireAuth
    // Si por algún motivo no hay rol en la request, devolvemos 403 (prohibido).
    if (!role) return res.status(403).json({ error: 'No autorizado: falta rol en el usuario autenticado' })
    // Verificamos si el rol del usuario está incluido en la lista de roles permitidos (allowed).
    if (!allowed.includes(role)) {
      return res.status(403).json({ error: 'Permisos insuficientes para esta operación' })
    }
    next()
  }
}

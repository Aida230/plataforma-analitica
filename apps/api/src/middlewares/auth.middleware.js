import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  //1- Leemos el encabezado de Authorization, si no existe, queda como string vacío
  const header = req.headers.authorization || ''
  //2- Dividimos por espacion. Esperamos 'Bearer <token>
  const [scheme, token] = header.split(' ')
  //3- Validamos el formato: Debe ser Bearer y tener token
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Falta Authorization: Bearer <token>😩'})
  }
  try {
    //4- Tomamos la clave secreta desde variables de entorno
    const secret = process.env.JWT_SECRET
    if (!secret) {
      //Si falta la clave mejor avisar con 500 (configuración del servidor)
      return res.status(500).json({ error: 'El JWT_SECRET no está configurado 🫠'})
    }
    //5- Verificamos el token: si es valido, devuelve el paiload (ejem: { sub, role, iat exp })
    const payload = jwt.verify(token, secret)
    // 6) Normalizamos los datos que usaremos en la request:
    //    - sub = "subject" del token (usamos como id del usuario)
    //    - role = rol del usuario para controles de autorización más adelante
    req.user = { id: payload.sub, role: payload.role }
    
    //7-Si todo va bien, pasams al siguiente middleware/controlador
    return next()
  } catch (err) {
    //Si el token es invalido o expiró, devolvemos 401 con un mensaje específico cuando sea posible
    if (err?.name === 'TokenExpiredError') {
      return res.status(401).json({ err: 'Token expirado' })
    }
    return res.status(401).json({ err: 'Token invalido' })

  }
}
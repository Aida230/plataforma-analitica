import { ZodError } from 'zod';

/**
 * Middleware de validacion de Zod
 * 
 * Uso: 
 * validate({ body: squemaZod})
 * validate ({query: squemaZod})
 * validate ({params: squemaZod})
 * 
 * Si los datos son válidos sigue al controllador
 * Si no -> responde cn un error 400 y lista de problemas
 */

export function validate (schemas = {}) {
  //schemas puede tener body, params y query
  const { body, params, query } = schemas;
  
  return (req, res, next) => {
    try {
      // Creamos un objeto para guardar los datos validados
      req.validatedData = {};

      // Validamos cada parte si tiene esquema
      if (body) req.validatedData.body = body.parse(req.body);
      if (params) req.validatedData.params = params.parse(req.params);
      if (query) req.validatedData.query = query.parse(req.query);


      //Si todo va bien -> pasa al siguiente middleware/controlador
      next();
    } catch (err) {
      //Si el error viene de Zod
      if (err instanceof ZodError) {
        //transformamos los errores de Zod en algo facil de leer
        const details = err.issues.map((i) => ({
          campo: i.path.join("."), //donde fallo ejemlo email
          mensaje: i.message, //que pasó ejem: email no valido
        }));
        return res.status(400).json({
          error: "Validacion fallida",
          detalles: details,
        });
      }

      //Si es otro tipo de error -> que lo maneje el errorMiddleware general
      next(err);
    }
  }
}

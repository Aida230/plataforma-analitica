// src/schemas/users.schema.js
import { z } from "zod";

/**
 * Reglas de validación para Usuarios.
 * - id: string no vacío (lo usamos en params para /users/:id)
 * - email: obligatorio en create y replace, formato email válido
 * - name: opcional; si viene, string no vacío y máx 120 chars
 */
const id = z.string().min(1, "id requerido 😉");

const email = z
  .string({
    required_error: "email es obligatorio 👌",
    invalid_type_error: "email debe ser string 😎",
  })
  .email("email no válido 😒");

const name = z
  .string({
    invalid_type_error: "name debe ser string 👌",
  })
  .min(1, "name no puede ser vacío 😎")
  .max(30, "name demasiado largo 😒")
  .optional();

export const UsersSchemas = {
  // GET /users → si luego añades paginación o filtros, aquí validas req.query
  list: {
    // Definición del esquema para la query de "listar usuarios"
    query: z.object({
      // `page`: número entero, mínimo 1, por defecto 1
      page: z.coerce.number().int().min(1).default(1),
      // `limit`: número entero, mínimo 1, máximo 50, por defecto 20
      limit: z.coerce.number().int().min(1).max(50).default(20),
      // `search`: string opcional, mínimo 1 caracter, máximo 120, sin espacios sobrantes
      search: z.string().trim().min(1).max(120).optional()
    }),
  },

  // GET /users/:id
  getById: {
    params: z.object({ id }),
  },

  // POST /users
  create: {
    body: z.object({
      email,
      name: name.optional(),
    }),
  },

  // PUT /users/:id → reemplaza datos completos (aquí pedimos email y name opcional)
  replace: {
    params: z.object({ id }),
    body: z.object({
      email,
      name: name.optional(),
    }),
  },

  // PATCH /users/:id → actualización parcial (al menos un campo)
  update: {
    params: z.object({ id }),
    body: z
      .object({
        email: email.optional(),
        name: name.optional(),
      })
      .refine(
        (data) => Object.keys(data).length > 0,
        { message: "Debes enviar al menos un campo: email o name" }
      ),
  },

  // DELETE /users/:id
  remove: {
    params: z.object({ id }),
  },
};

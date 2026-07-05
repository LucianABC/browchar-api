import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

/**
 * Schemas Zod de request del módulo Characters (DEV-81).
 *
 * Son la fuente de verdad: validan en runtime (vía el pipe global de
 * nestjs-zod) y de acá se derivan los tipos con `z.infer`, así no duplicamos
 * "tipo + validación".
 *
 * Nota: `values` es un objeto dinámico (su forma la define el `template` del
 * Playbook), por eso acá sólo se valida que sea un objeto; su contenido lo
 * valida el template validator (DEV-48).
 */

export const createCharacterSchema = z.object({
  name: z.string().trim().min(1, 'name es requerido'),
  playbookId: z.string().trim().min(1, 'playbookId es requerido'),
  // Sin auth todavía (DEV-5): ownerId llega en el body en modo dev.
  ownerId: z.string().trim().min(1, 'ownerId es requerido'),
  values: z.record(z.string(), z.unknown()).default(() => ({})),
});

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>;

export const listCharactersQuerySchema = z.object({
  playbookId: z.string().trim().min(1).optional(),
  gameId: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
  // Los query params llegan como string: coercionamos a número.
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(100).optional(),
});

export type ListCharactersQuery = z.infer<typeof listCharactersQuerySchema>;

/**
 * DTOs para los controllers. El pipe global de nestjs-zod (registrado en
 * AppModule) valida automáticamente cualquier @Body()/@Query() tipado con
 * estas clases — no hace falta pipe por ruta.
 */
export class CreateCharacterDto extends createZodDto(createCharacterSchema) {}

export class ListCharactersQueryDto extends createZodDto(
  listCharactersQuerySchema,
) {}

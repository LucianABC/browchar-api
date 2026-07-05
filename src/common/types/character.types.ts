import type { Character } from '../../../prisma/generated/client';

/**
 * Contratos request/response del módulo Characters.
 *
 * Nota: se modelan como tipos TS (patrón establecido en common/types), no como
 * DTOs class-validator. La validación de request (ValidationPipe + DTOs) se
 * implementa por separado en DEV-81; la validación de `values` contra el
 * template del Playbook, en DEV-48.
 */

/** Un error de validación de un campo de `values` contra el template. */
export interface ValidationError {
  field: string;
  message: string;
}

/** Metadata de paginación del envelope estándar. */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
}

/** Envelope estándar `data`/`meta` para respuestas paginadas (convención REST). */
export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Vista de Character expuesta por la API. */
export type CharacterView = Character;

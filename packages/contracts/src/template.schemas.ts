import { z } from 'zod';
import { FieldType } from './fields';

/**
 * Schema Zod de la FORMA de un template de Playbook (DEV-202).
 *
 * No confundir con `template-schema.ts` (que construye el validador de los
 * `values` de un personaje A PARTIR de un template): esto valida el template
 * mismo — la data que vive en `data/playbooks/**` del back y que el front
 * renderiza como form.
 *
 * Motivación: `Template` era solo un tipo TS, sin validador runtime, y
 * `buildTemplateSchema` trata los `type` desconocidos como `z.unknown()`
 * opcional — un typo en un seed (`"TXET"`) no explotaba: desactivaba la
 * validación de ese campo en silencio. Este schema convierte ese drift en un
 * error visible; `validate:data` (API) lo aplica sobre los seeds reales.
 *
 * `.strict()` a propósito: una clave desconocida en un field o una option es
 * casi siempre un typo (`lable`) o contrato desactualizado — mejor que grite.
 */

export const fieldOptionSchema = z
  .object({
    label: z.string().min(1),
    value: z.string().min(1),
    description: z.string().optional(),
  })
  .strict();

export const fieldDefinitionSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    description: z.string().optional(),
    required: z.boolean().optional(),
    type: z.enum(FieldType),
    defaultValue: z.unknown().optional(),
    maxValue: z.number().optional(),
    disabled: z.boolean().optional(),
    isReadOnly: z.boolean().optional(),
    options: z.array(fieldOptionSchema).optional(),
  })
  .strict();

export const templateSectionSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().optional(),
    description: z.string().optional(),
    fields: z.array(fieldDefinitionSchema).optional(),
  })
  .strict();

/** Valida un `template` completo (lista de secciones). */
export const templateDefinitionSchema = z.array(templateSectionSchema);

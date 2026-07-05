import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type { ZodType } from 'zod';

/**
 * Pipe de validación de requests con Zod (DEV-81).
 *
 * Se aplica por endpoint pasándole un schema:
 *   @Body(new ZodValidationPipe(createCharacterSchema)) body: CreateCharacterInput
 *
 * Valida (y coacciona) el input en runtime antes de llegar al controller/service.
 * Si el input no matchea el schema, responde `400` con la lista de errores por campo.
 */
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Request inválido',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.') || '(root)',
          message: issue.message,
        })),
      });
    }

    return result.data;
  }
}

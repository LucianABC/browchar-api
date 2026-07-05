import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ZodValidationPipe } from '@/common/validation/zod-validation.pipe';
import {
  createCharacterSchema,
  listCharactersQuerySchema,
  type CreateCharacterInput,
  type ListCharactersQuery,
} from './character.schemas';

/**
 * Rutas del recurso Characters.
 *
 * La validación de la forma del request (DEV-81) se hace con Zod vía
 * `ZodValidationPipe`; la validación de dominio de `values` contra el template
 * del Playbook vive en el service (DEV-48).
 */
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createCharacterSchema))
    body: CreateCharacterInput,
  ) {
    return this.charactersService.create(body);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(listCharactersQuerySchema))
    query: ListCharactersQuery,
  ) {
    return this.charactersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }
}

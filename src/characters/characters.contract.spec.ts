import {
  buildTemplateSchema,
  characterCreateFixtures,
  characterUpdateFixtures,
  contractTemplateFixture,
  listCharactersQueryFixtures,
  templateValuesFixtures,
} from '@tpklabs/browchar-contracts';
import type { InvalidFixture } from '@tpklabs/browchar-contracts';
import {
  CreateCharacterDto,
  ListCharactersQueryDto,
  UpdateCharacterDto,
} from './character.schemas';

/**
 * Contract tests del recurso Characters (DEV-202).
 *
 * A diferencia de los specs del paquete (que validan los fixtures contra los
 * schemas "en abstracto"), acá se ejercita la capa que la API usa en runtime:
 * los DTOs `createZodDto` que nestjs-zod valida en cada request, y la
 * validación de `values` contra template que hace el service. Si el wiring
 * DTO<->schema compartido se rompe (o alguien redefine un DTO local), esto
 * falla aunque el paquete siga verde.
 */

function expectDtoContract(
  schema: { safeParse: (input: unknown) => { success: boolean } },
  fixtures: { valid: unknown[]; invalid: InvalidFixture[] },
) {
  for (const input of fixtures.valid) {
    expect(schema.safeParse(input).success).toBe(true);
  }
  for (const { reason, input } of fixtures.invalid) {
    expect({ reason, success: schema.safeParse(input).success }).toEqual({
      reason,
      success: false,
    });
  }
}

describe('Characters contract (fixtures compartidos)', () => {
  it('CreateCharacterDto valida igual que el contrato', () => {
    expectDtoContract(CreateCharacterDto.schema, characterCreateFixtures);
  });

  it('UpdateCharacterDto valida igual que el contrato', () => {
    expectDtoContract(UpdateCharacterDto.schema, characterUpdateFixtures);
  });

  it('ListCharactersQueryDto valida igual que el contrato', () => {
    expectDtoContract(
      ListCharactersQueryDto.schema,
      listCharactersQueryFixtures,
    );
  });

  it('los values se validan contra el template como lo hace el service (sin coerción)', () => {
    // Mismo modo que characters.service: JSON ya tipado, coerceNumbers false.
    const schema = buildTemplateSchema(contractTemplateFixture);
    expectDtoContract(schema, templateValuesFixtures);
  });
});

import type { ZodType } from 'zod';
import {
  createCharacterSchema,
  listCharactersQuerySchema,
  updateCharacterSchema,
} from './character.schemas';
import { listPlaybooksQuerySchema } from './playbook.schemas';
import { buildTemplateSchema } from './template-schema';
import {
  characterCreateFixtures,
  characterUpdateFixtures,
  contractTemplateFixture,
  listCharactersQueryFixtures,
  listPlaybooksQueryFixtures,
  templateFormValuesFixtures,
  templateValuesFixtures,
} from './fixtures';
import type { InvalidFixture } from './fixtures';

/**
 * Auto-validación de los fixtures del contrato (DEV-202): cada `valid` parsea
 * y cada `invalid` falla con el primer issue apuntando al `path` declarado.
 * Si un cambio de schema invalida un fixture, este spec falla — y con él el
 * publish del paquete y los contract tests de API y FE.
 */

function expectContract(
  schema: ZodType,
  fixtures: { valid: unknown[]; invalid: InvalidFixture[] },
) {
  for (const input of fixtures.valid) {
    const result = schema.safeParse(input);
    expect(result.success).toBe(true);
  }
  for (const { reason, path, input } of fixtures.invalid) {
    const result = schema.safeParse(input);
    // El reason viaja en el assert para que el fallo diga QUÉ caso se rompió.
    expect({ reason, success: result.success }).toEqual({
      reason,
      success: false,
    });
    if (!result.success) {
      expect({ reason, path: result.error.issues[0]?.path[0] }).toEqual({
        reason,
        path,
      });
    }
  }
}

describe('contract fixtures', () => {
  it('createCharacterSchema acepta los válidos y rechaza los inválidos', () => {
    expectContract(createCharacterSchema, characterCreateFixtures);
  });

  it('updateCharacterSchema acepta los válidos y rechaza los inválidos', () => {
    expectContract(updateCharacterSchema, characterUpdateFixtures);
  });

  it('listCharactersQuerySchema acepta los válidos y rechaza los inválidos', () => {
    expectContract(listCharactersQuerySchema, listCharactersQueryFixtures);
  });

  it('listPlaybooksQuerySchema acepta los válidos y rechaza los inválidos', () => {
    expectContract(listPlaybooksQuerySchema, listPlaybooksQueryFixtures);
  });

  it('buildTemplateSchema (modo API) valida los values contra el template de contrato', () => {
    const schema = buildTemplateSchema(contractTemplateFixture);
    expectContract(schema, templateValuesFixtures);
  });

  it('buildTemplateSchema (modo form, coerceNumbers) valida los values del front', () => {
    const schema = buildTemplateSchema(contractTemplateFixture, {
      coerceNumbers: true,
    });
    expectContract(schema, templateFormValuesFixtures);
  });

  it('values defaultea a {} en create (contrato: values es opcional)', () => {
    const parsed = createCharacterSchema.parse({
      name: 'Recluta sin ficha',
      playbookId: 'masks-base',
      ownerId: 'owner-2',
    });
    expect(parsed.values).toEqual({});
  });

  it('la query de characters coerciona page/pageSize string -> number', () => {
    const parsed = listCharactersQuerySchema.parse({
      page: '2',
      pageSize: '20',
    });
    expect(parsed).toEqual({ page: 2, pageSize: 20 });
  });
});

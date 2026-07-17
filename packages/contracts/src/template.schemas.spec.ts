import { FieldType } from './fields';
import { contractTemplateFixture } from './fixtures';
import { templateDefinitionSchema } from './template.schemas';

describe('templateDefinitionSchema', () => {
  it('acepta el template fixture del contrato (el fixture debe conformar su propio schema)', () => {
    const result = templateDefinitionSchema.safeParse(contractTemplateFixture);
    expect(result.success).toBe(true);
  });

  it('rechaza un FieldType con typo (el bug silencioso que motiva el schema)', () => {
    const result = templateDefinitionSchema.safeParse([
      {
        id: 'section',
        fields: [{ id: 'f', label: 'F', type: 'TXET' }],
      },
    ]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual([0, 'fields', 0, 'type']);
    }
  });

  it('rechaza una option sin value', () => {
    const result = templateDefinitionSchema.safeParse([
      {
        id: 'section',
        fields: [
          {
            id: 'f',
            label: 'F',
            type: FieldType.SELECT,
            options: [{ label: 'Good' }],
          },
        ],
      },
    ]);
    expect(result.success).toBe(false);
  });

  it('rechaza claves desconocidas en un field (strict: los typos gritan)', () => {
    const result = templateDefinitionSchema.safeParse([
      {
        id: 'section',
        fields: [{ id: 'f', lable: 'typo', label: 'F', type: FieldType.TEXT }],
      },
    ]);
    expect(result.success).toBe(false);
  });

  it('acepta una sección sin fields (solo texto descriptivo)', () => {
    const result = templateDefinitionSchema.safeParse([
      { id: 'lore', title: 'Lore', description: 'Solo lectura' },
    ]);
    expect(result.success).toBe(true);
  });
});

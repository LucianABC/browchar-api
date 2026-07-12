import { listPlaybooksQuerySchema } from './playbook.schemas';

describe('listPlaybooksQuerySchema', () => {
  it('acepta un query vacío', () => {
    expect(listPlaybooksQuerySchema.parse({})).toEqual({});
  });

  it('acepta gameId', () => {
    expect(listPlaybooksQuerySchema.parse({ gameId: 'dnd5e' })).toEqual({
      gameId: 'dnd5e',
    });
  });

  it('rechaza gameId vacío', () => {
    const result = listPlaybooksQuerySchema.safeParse({ gameId: '' });
    expect(result.success).toBe(false);
  });
});

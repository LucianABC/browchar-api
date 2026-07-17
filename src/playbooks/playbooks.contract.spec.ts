import { listPlaybooksQueryFixtures } from '@tpklabs/browchar-contracts';
import { ListPlaybooksQueryDto } from './playbook.schemas';

/**
 * Contract tests del recurso Playbooks (DEV-202): el DTO que valida la query
 * en runtime acepta/rechaza exactamente los fixtures compartidos del paquete.
 */

describe('Playbooks contract (fixtures compartidos)', () => {
  it('ListPlaybooksQueryDto valida igual que el contrato', () => {
    for (const input of listPlaybooksQueryFixtures.valid) {
      expect(ListPlaybooksQueryDto.schema.safeParse(input).success).toBe(true);
    }
    for (const { reason, input } of listPlaybooksQueryFixtures.invalid) {
      expect({
        reason,
        success: ListPlaybooksQueryDto.schema.safeParse(input).success,
      }).toEqual({ reason, success: false });
    }
  });
});

import { createZodDto } from 'nestjs-zod';
import { listPlaybooksQuerySchema } from '@tpklabs/browchar-contracts';

export { listPlaybooksQuerySchema } from '@tpklabs/browchar-contracts';
export type { ListPlaybooksQuery } from '@tpklabs/browchar-contracts';

export class ListPlaybooksQueryDto extends createZodDto(
  listPlaybooksQuerySchema,
) {}

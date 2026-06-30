import type { Playbook } from '../../../prisma/generated/client';

export interface PlaybookView extends Omit<Playbook, 'gameId'> {
  game: { gameId: string; gameName: string };
}

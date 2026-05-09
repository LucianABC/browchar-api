import fs from 'node:fs/promises';
import path from 'node:path';
import prisma from '@db';
import type { Prisma } from './generated/client';
import type { TemplateSection } from '../src/common/types/template.types';

import { apocalypseWorldPlaybookSpecificSections } from '../data/playbooks/apocalypse-world/playbookSections';

type SeedSystem = {
  key: string;
  name: string;
};

type SeedGame = {
  key: string;
  name: string;
  systemKey: string;
};

type SeedTemplateSection = TemplateSection & Prisma.JsonObject;

type BasePlaybook = {
  id: string;
  gameId: string;
  name: string;
  version: number;
  description?: string;
  template: SeedTemplateSection[];
};

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filePath: string): Promise<T> {
  const file = await fs.readFile(filePath, 'utf-8');

  try {
    return JSON.parse(file) as T;
  } catch (error) {
    throw new Error(
      `[SEED] Invalid JSON file: ${filePath}\n${(error as Error).message}`,
    );
  }
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildPlaybookTemplate(
  baseTemplate: SeedTemplateSection[],
  specificSections: SeedTemplateSection[],
) {
  return cloneJson([...baseTemplate, ...specificSections]);
}

async function seedSystems() {
  const systemsPath = path.join(DATA_DIR, 'systems.json');
  const systems = await readJsonFile<SeedSystem[]>(systemsPath);

  for (const system of systems) {
    await prisma.system.upsert({
      where: {
        key: system.key,
      },
      update: {
        name: system.name,
      },
      create: {
        key: system.key,
        name: system.name,
      },
    });
  }

  return systems;
}

async function seedGames() {
  const gamesPath = path.join(DATA_DIR, 'games', 'games.json');
  const games = await readJsonFile<SeedGame[]>(gamesPath);

  for (const game of games) {
    const system = await prisma.system.findUnique({
      where: {
        key: game.systemKey,
      },
    });

    if (!system) {
      throw new Error(
        `[SEED] System with key "${game.systemKey}" not found for game "${game.key}"`,
      );
    }

    await prisma.game.upsert({
      where: {
        key: game.key,
      },
      update: {
        name: game.name,
        systemId: system.id,
      },
      create: {
        key: game.key,
        name: game.name,
        systemId: system.id,
      },
    });
  }

  return games;
}

async function seedPlaybooksForGame(gameKey: string, folderName: string) {
  const game = await prisma.game.findUnique({
    where: {
      key: gameKey,
    },
  });

  if (!game) {
    throw new Error(`[SEED] Game with key "${gameKey}" not found`);
  }

  const playbooksDir = path.join(DATA_DIR, 'playbooks', folderName);
  const basePath = path.join(playbooksDir, 'base.json');
  const basePlaybook = await readJsonFile<BasePlaybook>(basePath);

  if (!basePlaybook.version) {
    throw new Error(`[SEED] Base playbook must have a version: ${basePath}`);
  }

  if (!Array.isArray(basePlaybook.template)) {
    throw new Error(`[SEED] Base playbook template must be an array: ${basePath}`);
  }

  const playbookEntries = Object.entries(apocalypseWorldPlaybookSpecificSections);

  if (playbookEntries.length === 0) {
    throw new Error(
      `[SEED] No playbook sections found for game "${gameKey}" in ${folderName}`,
    );
  }

  for (const [playbookName, specificSections] of playbookEntries) {
    const template = buildPlaybookTemplate(
      basePlaybook.template,
      specificSections as SeedTemplateSection[],
    );

    await prisma.playbook.upsert({
      where: {
        gameId_name_version: {
          gameId: game.id,
          name: playbookName,
          version: basePlaybook.version,
        },
      },
      update: {
        description: `${playbookName} playbook for Apocalypse World.`,
        template,
      },
      create: {
        gameId: game.id,
        name: playbookName,
        version: basePlaybook.version,
        description: `${playbookName} playbook for Apocalypse World.`,
        template,
      },
    });
  }
}

async function main() {
  await seedSystems();
  await seedGames();
  await seedPlaybooksForGame('AW', 'apocalypse-world');

  console.log('✅ Seeding completado con éxito.');
}

main()
  .catch((error) => {
    console.error('❌ Error ejecutando seed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

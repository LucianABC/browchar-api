import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Crear el Sistema base
  const pbta = await prisma.system.upsert({
    where: { name: 'PbtA' },
    update: {},
    create: { name: 'PbtA' },
  });

  // 2. Crear el Juego Dungeon World
  const dwGame = await prisma.game.upsert({
    where: { key: 'APOCALYPSE_WORLD' },
    update: {},
    create: {
      key: 'APOCALYPSE_WORLD',
      name: 'Apocalypse World',
      systemId: pbta.id,
    },
  });

  // 3. Crear el Template (La definición de la hoja)
  await prisma.template.upsert({
    where: {
      gameId_name_version: {
        gameId: dwGame.id,
        name: 'Hoja de Personaje Estándar',
        version: 1,
      },
    },
    update: {},
    create: {
      gameId: dwGame.id,
      name: 'Hoja de Personaje Estándar',
      version: 1,
      schema: {
        stats: [
          { name: 'Fuerza', short: 'STR' },
          { name: 'Destreza', short: 'DEX' },
          { name: 'Constitución', short: 'CON' }
        ],
        vitals: ['HP', 'XP'],
        allowSpells: true
      },
    },
  });

  console.log('Seed de Dungeon World completado.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
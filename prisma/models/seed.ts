import prisma from '@db';

async function main() {
  console.log('--- Iniciando Seeding Profesional ---');

  // 1. Definimos el Sistema PBTA
  const pbtaSystem = await prisma.system.upsert({
    where: { key: 'PBTA' },
    update: {},
    create: {
      key: 'PBTA',
      name: 'Powered by the Apocalypse',
    },
  });

  // 2. Definimos los Juegos y sus Templates
  const gamesData = [
    {
      key: 'AW',
      name: 'Apocalypse World',
      templates: [
        { name: 'The Driver', version: 1, schema: { stats: ['Hard', 'Hot', 'Sharp', 'Cool', 'Weird'] } },
        { name: 'The Angel', version: 1, schema: { stats: ['Hard', 'Hot', 'Sharp', 'Cool', 'Weird'] } },
      ],
    },
    {
      key: 'MASKS',
      name: 'Masks: A New Generation',
      templates: [
        { name: 'The Beacon', version: 1, schema: { stats: ['Danger', 'Freak', 'Savior', 'Superior', 'Mundane'] } },
        { name: 'The Nova', version: 1, schema: { stats: ['Danger', 'Freak', 'Savior', 'Superior', 'Mundane'] } },
      ],
    },
    {
      key: 'DW',
      name: 'Dungeon World',
      templates: [
        { name: 'Bard', version: 1, schema: { stats: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] } },
        { name: 'Fighter', version: 1, schema: { stats: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] } },
      ],
    },
    {
      key: 'TSL',
      name: 'Thirsty Sword Lesbians',
      templates: [
        { name: 'The Beast', version: 1, schema: { stats: ['Daring', 'Grace', 'Heart', 'Wit', 'Spirit'] } },
        { name: 'The Chosen', version: 1, schema: { stats: ['Daring', 'Grace', 'Heart', 'Wit', 'Spirit'] } },
      ],
    },
  ];

  for (const gameInfo of gamesData) {
    // Crear o actualizar el Juego
    const game = await prisma.game.upsert({
      where: { key: gameInfo.key },
      update: { name: gameInfo.name },
      create: {
        key: gameInfo.key,
        name: gameInfo.name,
        systemId: pbtaSystem.id,
      },
    });

    console.log(`🕹️ Juego configurado: ${game.name}`);

    // Crear Templates para cada juego
    for (const temp of gameInfo.templates) {
      await prisma.template.upsert({
        where: {
          gameId_name_version: {
            gameId: game.id,
            name: temp.name,
            version: temp.version,
          },
        },
        update: { schema: temp.schema },
        create: {
          gameId: game.id,
          name: temp.name,
          version: temp.version,
          schema: temp.schema,
        },
      });
      console.log(`   📄 Template listo: ${temp.name} (v${temp.version})`);
    }
  }

  console.log('--- Seeding Finalizado ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
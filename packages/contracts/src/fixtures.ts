import { FieldType } from './fields';
import type { Template } from './fields';

/**
 * Fixtures compartidos del contrato FE/BE (DEV-202).
 *
 * Son la definición ejecutable de "las dos puntas hablan el mismo idioma":
 * browchar-api valida que sus DTOs (`createZodDto`) aceptan/rechazan estos
 * casos, y browchar-fe valida que su form y sus hooks producen/consumen
 * exactamente estas formas. Un cambio de contrato que invalide un fixture
 * rompe el test en ambos repos — que es el punto.
 *
 * Convenciones:
 * - `valid`: el schema correspondiente debe aceptarlos tal cual.
 * - `invalid`: el schema debe rechazarlos, y el primer issue de Zod debe
 *   apuntar a `path` (undefined = error a nivel raíz, p.ej. un `.refine`).
 * - El spec del paquete (`fixtures.spec.ts`) los valida contra los schemas
 *   de acá, para que los fixtures no puedan quedar desactualizados.
 */

export interface InvalidFixture<T = unknown> {
  /** Por qué es inválido — documentación viva del contrato. */
  reason: string;
  /** Primer segmento del path del issue de Zod esperado; undefined = raíz. */
  path?: string;
  input: T;
}

/* ------------------------------------------------------------------ */
/* POST /characters — createCharacterSchema                            */
/* ------------------------------------------------------------------ */

export const characterCreateFixtures = {
  valid: [
    {
      name: 'Marlene la Impía',
      playbookId: 'dungeon-world-base',
      ownerId: 'owner-1',
      values: { look: 'Ojos cansados, capa raída' },
    },
    // `values` es opcional: el schema lo defaultea a {}.
    {
      name: 'Recluta sin ficha',
      playbookId: 'masks-base',
      ownerId: 'owner-2',
    },
  ],
  invalid: [
    {
      reason: 'name vacío (tras trim)',
      path: 'name',
      input: {
        name: '   ',
        playbookId: 'dungeon-world-base',
        ownerId: 'owner-1',
      },
    },
    {
      reason: 'falta playbookId',
      path: 'playbookId',
      input: { name: 'Marlene', ownerId: 'owner-1' },
    },
    {
      reason: 'falta ownerId (sin auth todavía, viaja en el body — DEV-5)',
      path: 'ownerId',
      input: { name: 'Marlene', playbookId: 'dungeon-world-base' },
    },
    {
      reason: 'values no es un objeto',
      path: 'values',
      input: {
        name: 'Marlene',
        playbookId: 'dungeon-world-base',
        ownerId: 'owner-1',
        values: 'no-un-objeto',
      },
    },
  ] as InvalidFixture[],
};

/* ------------------------------------------------------------------ */
/* PATCH /characters/:id — updateCharacterSchema                       */
/* ------------------------------------------------------------------ */

export const characterUpdateFixtures = {
  valid: [
    { name: 'Marlene renombrada' },
    { values: { look: 'Ahora con sombrero' } },
    { name: 'Ambos', values: { look: 'Completo' } },
  ],
  invalid: [
    {
      reason: 'body vacío: el update parcial exige al menos un campo',
      path: undefined,
      input: {},
    },
    {
      reason: 'name vacío (tras trim)',
      path: 'name',
      input: { name: '  ' },
    },
  ] as InvalidFixture[],
};

/* ------------------------------------------------------------------ */
/* GET /characters — listCharactersQuerySchema                         */
/* ------------------------------------------------------------------ */

export const listCharactersQueryFixtures = {
  valid: [
    // Los query params llegan como string: el schema coerciona los números.
    { page: '2', pageSize: '20' },
    { playbookId: 'dungeon-world-base', gameId: 'dungeon-world' },
    { search: 'marlene' },
    {},
  ],
  invalid: [
    {
      reason: 'page debe ser un entero positivo',
      path: 'page',
      input: { page: '0' },
    },
    {
      reason: 'pageSize supera el máximo de 100',
      path: 'pageSize',
      input: { pageSize: '200' },
    },
    {
      reason: 'search vacío (tras trim) no es un filtro válido',
      path: 'search',
      input: { search: '  ' },
    },
  ] as InvalidFixture[],
};

/* ------------------------------------------------------------------ */
/* GET /playbooks — listPlaybooksQuerySchema                           */
/* ------------------------------------------------------------------ */

export const listPlaybooksQueryFixtures = {
  valid: [{ gameId: 'dungeon-world' }, {}],
  invalid: [
    {
      reason: 'gameId vacío (tras trim)',
      path: 'gameId',
      input: { gameId: ' ' },
    },
  ] as InvalidFixture[],
};

/* ------------------------------------------------------------------ */
/* Template + values — buildTemplateSchema                             */
/* ------------------------------------------------------------------ */

/**
 * Template de contrato: ejercita TODOS los `FieldType` y los modificadores
 * relevantes (required, maxValue, options, isReadOnly). Deliberadamente
 * sintético — la data real vive en `data/playbooks/**` del back — pero con la
 * misma forma que produce el seed y consume el form del front.
 */
export const contractTemplateFixture: Template = [
  {
    id: 'identity',
    title: 'Identity',
    fields: [
      { id: 'alias', label: 'Alias', type: FieldType.TEXT, required: true },
      { id: 'look', label: 'Look', type: FieldType.TEXTAREA },
    ],
  },
  {
    id: 'stats',
    title: 'Stats',
    fields: [
      // TEXTNUMBER admite negativos (modificadores) — divergencia corregida
      // en DEV-153, acá queda clavada en el contrato.
      { id: 'modifier', label: 'Modifier', type: FieldType.TEXTNUMBER },
      {
        id: 'hp',
        label: 'HP',
        type: FieldType.COUNTER,
        required: true,
        maxValue: 10,
      },
      { id: 'xp', label: 'XP', type: FieldType.PROGRESS, maxValue: 8 },
    ],
  },
  {
    id: 'choices',
    title: 'Choices',
    fields: [
      {
        id: 'alignment',
        label: 'Alignment',
        type: FieldType.SELECT,
        required: true,
        options: [
          { label: 'Good', value: 'good' },
          { label: 'Evil', value: 'evil' },
        ],
      },
      {
        id: 'origin',
        label: 'Origin',
        type: FieldType.RADIO,
        options: [
          { label: 'City', value: 'city' },
          { label: 'Wilds', value: 'wilds' },
        ],
      },
      {
        id: 'gear',
        label: 'Gear',
        type: FieldType.CHECKBOX,
        options: [
          { label: 'Rope', value: 'rope' },
          { label: 'Torch', value: 'torch' },
        ],
      },
      // CHECKBOX sin options = booleano.
      { id: 'inspired', label: 'Inspired', type: FieldType.CHECKBOX },
      // Display-only: nunca se valida aunque diga required.
      {
        id: 'rules',
        label: 'Additional Rules',
        type: FieldType.TEXT,
        required: true,
        isReadOnly: true,
      },
    ],
  },
];

/**
 * `values` contra `contractTemplateFixture` en modo API (JSON ya tipado,
 * `coerceNumbers: false`).
 */
export const templateValuesFixtures = {
  valid: [
    {
      alias: 'Marlene',
      look: 'Capa raída',
      modifier: -2, // negativo permitido
      hp: 10, // == maxValue, borde válido
      xp: 0,
      alignment: 'good',
      origin: 'wilds',
      gear: ['rope', 'torch'], // múltiple
      inspired: false, // false es válido
      offTemplate: 'passthrough', // clave fuera del template: permitida
    },
    // Mínimo: solo los required (alias, hp, alignment). rules es isReadOnly.
    { alias: 'Mín', hp: 0, alignment: 'evil' },
  ],
  invalid: [
    {
      reason: 'falta alias (required)',
      path: 'alias',
      input: { hp: 5, alignment: 'good' },
    },
    {
      reason: 'hp supera maxValue',
      path: 'hp',
      input: { alias: 'M', hp: 11, alignment: 'good' },
    },
    {
      reason: 'alignment fuera de las options',
      path: 'alignment',
      input: { alias: 'M', hp: 5, alignment: 'chaotic' },
    },
    {
      reason: 'gear con una opción inexistente',
      path: 'gear',
      input: { alias: 'M', hp: 5, alignment: 'good', gear: ['sword'] },
    },
    {
      reason: 'inspired debe ser booleano',
      path: 'inspired',
      input: { alias: 'M', hp: 5, alignment: 'good', inspired: 'yes' },
    },
    {
      reason: 'modifier debe ser number en modo API (sin coerción)',
      path: 'modifier',
      input: { alias: 'M', hp: 5, alignment: 'good', modifier: '3' },
    },
  ] as InvalidFixture[],
};

/**
 * `values` contra `contractTemplateFixture` en modo form
 * (`coerceNumbers: true`): react-hook-form entrega los numéricos como string
 * y los opcionales vacíos como ''. Es la forma que produce el front antes
 * del submit.
 */
export const templateFormValuesFixtures = {
  valid: [
    {
      alias: 'Marlene',
      look: '',
      modifier: '-2', // string numérico: el builder lo coerciona
      hp: '10',
      xp: '',
      alignment: 'good',
      origin: '', // choice opcional sin seleccionar
      gear: [],
      inspired: false,
    },
  ],
  invalid: [
    {
      reason: 'hp requerido llega vacío desde el input',
      path: 'hp',
      input: { alias: 'M', hp: '', alignment: 'good' },
    },
    {
      reason: 'modifier no numérico no se coerciona',
      path: 'modifier',
      input: { alias: 'M', hp: '5', alignment: 'good', modifier: 'tres' },
    },
  ] as InvalidFixture[],
};

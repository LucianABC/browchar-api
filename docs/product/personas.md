# User Personas — RPG Character Manager

Scope: MVP (Apocalypse World, sin campañas, sin auth real)
Last updated: 2026-07-13

> Este doc detalla las personas que hay detrás del "Usuario objetivo" de
> [`mvp.md`](./mvp.md#usuario-objetivo). No lo contradice: lo aterriza en perfiles
> concretos con objetivos, frustraciones y qué feature del MVP les resuelve el problema.

---

## Por qué personas

`mvp.md` define el usuario objetivo a alto nivel ("jugadores individuales que quieren
crear y consultar sus propios personajes de forma más ordenada que con PDFs o planillas").
Para tomar decisiones de UX y priorización contra necesidades concretas —y no contra
supuestos genéricos— definimos dos personas alineadas al scope del MVP.

---

## Persona 1 — Nadia, la jugadora que ya juega Apocalypse World

**Contexto de uso.** Juega AW cada dos semanas con su grupo. Hoy tiene sus personajes
repartidos entre un PDF rellenable, una nota del teléfono y una foto de la hoja en papel.

**Objetivos.**

- Tener sus personajes en un solo lugar, ordenados y accesibles desde cualquier dispositivo.
- Consultar rápido los datos de un personaje durante la partida.
- Crear un personaje nuevo sin volver a pelearse con un PDF que se desconfigura.

**Frustraciones actuales.**

- Los PDFs rellenables se rompen o pierden el formato entre dispositivos.
- Google Docs/planillas no tienen la estructura del playbook: hay que armar todo a mano.
- El papel no es consultable si no lo tiene encima.

**Qué feature del MVP le resuelve el problema.**

- Crear personaje a partir de un playbook de AW con el formulario ya estructurado.
- Listado y detalle para consultar sus personajes cuando quiera.

---

## Persona 2 — Tomás, el jugador nuevo/curioso

**Contexto de uso.** Escuchó de Apocalypse World y quiere probar un playbook sin haberse
leído todo el manual. Se frustra frente a una hoja en blanco.

**Objetivos.**

- Armar un personaje jugable rápido, sin dominar todavía las reglas.
- Entender qué hace cada campo de un playbook a medida que lo completa.

**Frustraciones actuales.**

- La hoja en blanco lo bloquea: no sabe por dónde empezar.
- Las guías existentes están dispersas en el manual y foros.

**Qué feature del MVP le resuelve el problema.**

- El **draft con IA**: genera un borrador editable a partir de un playbook y una idea
  opcional, así no arranca de cero (`mvp.md` §"Alcance de IA para el MVP").
- El formulario editable para revisar y ajustar lo que la IA propuso antes de guardar.

---

## Fuera de alcance de estas personas (para evitar scope creep)

Estas personas **no** son foco del MVP y no deben motivar features en esta etapa:

- **Game Master** — necesita gestionar NPCs, campañas y sesiones. Fuera del MVP
  (`mvp.md` §"Fuera de alcance": Campañas).
- **Jugador de campañas multi-sistema** — juega varios juegos distintos de AW y quiere
  todo unificado. El MVP soporta solo Apocalypse World a nivel producto.
- **Grupo colaborando en tiempo real** — multiplayer/colaboración está explícitamente
  fuera de alcance.

---

## Referencias

- [`mvp.md`](./mvp.md) — alcance y usuario objetivo.
- [`roadmap.md`](./roadmap.md) — cuándo entran GM y multi-juego (R2/R3).

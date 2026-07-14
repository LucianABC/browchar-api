# User Journeys — RPG Character Manager

Scope: MVP (Apocalypse World)
Last updated: 2026-07-13

> El **happy path** ya está documentado en [`mvp.md` §"Flujo principal"](./mvp.md#flujo-principal)
> (10 pasos: ingresar → listado → crear → elegir playbook → completar o generar draft IA →
> revisar/editar/descartar → guardar → ver en listado → abrir detalle). Este doc **no lo
> repite**: cubre los journeys **secundarios y de error**, y los ancla a los componentes
> reales de `browchar-fe` para que sean trazables al código.

---

## Journey A — Sin playbooks disponibles

**Cuándo.** El usuario entra a crear personaje y no hay playbooks cargados (falla el seed
o la API devuelve lista vacía).

**Qué ve.** Un estado vacío claro que explica que no hay playbooks disponibles, en vez de un
selector vacío sin contexto.

**Dónde ocurre.** `src/app/playbooks/page.tsx` / `src/components/playbooks/playbooks-list.tsx`
y el paso de selección previo al `character-create-form`.

**Estado vs. código.** El manejo de lista vacía debe verificarse contra
`use-playbooks.ts`. Si hoy no muestra un empty state explícito → **gap**, no documentar como
existente.

---

## Journey B — Descartar el draft de IA

**Cuándo.** El usuario genera un draft con IA, no le convence y lo descarta.

**Qué ve / a dónde vuelve.** Vuelve al formulario de creación en su estado previo (o limpio),
sin que se haya guardado nada — coherente con `mvp.md`: la IA nunca persiste sin revisión.

**Dónde ocurre.** Flujo de generación IA sobre `character-create-form.tsx` /
`character-create-form-container.tsx`.

**Estado vs. código.** La generación de draft IA es trabajo futuro (Sprint 4, DEV-133). Este
journey documenta el comportamiento **esperado**; se marca como pendiente de implementación.

---

## Journey C — Error de validación al guardar (400)

**Cuándo.** El usuario envía el formulario con datos inválidos (campo requerido vacío, tipo
incorrecto según el template).

**Qué ve.** Errores por campo, sin perder lo ya cargado; corrige y reintenta.

**Dónde ocurre.** Validación en `src/lib/characters/character-schema.ts` (Zod dinámico desde
el template) y render de errores en `dynamic-field.tsx`; el submit vive en
`use-create-character.ts`.

**Estado vs. código.** Validación frontend y errores por campo ya implementados
(DEV-50 / DEV-55).

---

## Journey D — Error de servidor o red al guardar (404 / 500)

**Cuándo.** El backend responde con error o no hay red al guardar.

**Qué ve / qué opciones tiene.** Un mensaje de error general (no por campo) con opción de
reintentar; los datos del formulario se mantienen.

**Dónde ocurre.** Manejo de error en `use-create-character.ts`; feedback vía el sistema de
toasts (DEV-75, pendiente) o mensaje inline.

**Estado vs. código.** El toast global todavía es un ticket abierto → hasta entonces el
error general puede mostrarse inline. Marcar el toast como **gap** si aún no existe.

---

## Journey E — Volver atrás sin guardar

**Cuándo.** El usuario está en el formulario de creación y decide salir sin guardar.

**Qué ve / a dónde vuelve.** Vuelve al listado de personajes; nada se persiste.

**Dónde ocurre.** Acción de cancelar/volver en `character-create-form.tsx` → navegación a
`src/app/page.tsx` (listado).

**Consideración.** Si hay cambios sin guardar, evaluar (fuera del MVP) una confirmación antes
de descartar (reutilizaría el Confirmation dialog, DEV-74).

---

## Referencias

- [`mvp.md`](./mvp.md) — happy path y criterios de éxito.
- Componentes: `browchar-fe/src/components/characters/*`, `src/lib/characters/*`,
  `src/app/page.tsx`, `src/app/playbooks/page.tsx`.

# Feedback loop de usuarios beta

Scope: etapa beta (MVP deployado, sin auth)
Last updated: 2026-07-13

> Define cómo se recolecta y triagea el feedback de los primeros usuarios reales una vez que
> el MVP esté público (épic de deployment, DEV-163), para no improvisar el canal cuando
> lleguen. Se prioriza lo **más simple de implementar** dado el estado actual: sin auth y sin
> backend de soporte.

---

## Canal de entrada

Opción elegida para la beta: **un link visible en la app** (footer o navbar,
`src/components/navbar.tsx`) que abra un **form simple** (Google Form / Tally) o un `mailto:`.

Por qué el más simple:

- No requiere auth ni backend de soporte (que no existen en esta etapa).
- Cero mantenimiento: el form vive fuera de la app.
- Alternativa igual de válida: un template de **GitHub Issue** enlazado, si los beta testers
  son técnicos.

Se descarta por ahora un widget de feedback in-app (más esfuerzo, requiere backend).

---

## Qué se pregunta como mínimo

Tres preguntas, para que el reporte sea accionable:

1. **¿Qué intentabas hacer?**
2. **¿Qué esperabas que pasara?**
3. **¿Qué pasó en realidad?**

Opcionales: navegador/dispositivo y un screenshot.

---

## Proceso de triage

- **Quién.** El dev (dueño del proyecto) revisa el canal.
- **Frecuencia.** Una pasada fija por semana (o al recibir notificación del form).
- **De feedback a Jira.** Cada item accionable se convierte en un ticket en el proyecto
  **DEV**, con label `beta-feedback` y tipo `Bug` o `Task` según corresponda. Los duplicados
  se linkean al ticket canónico (mismo criterio que se usó con DEV-97/98).

---

## Vigencia

Este canal aplica a la etapa **beta / sin-auth**. Se revisa cuando exista auth real y
cuentas de usuario (R2, [`roadmap.md`](./roadmap.md)): ahí puede convenir un canal
autenticado que asocie el feedback al usuario.

Todo lo definido acá es accionable con el estado actual del proyecto: no depende de features
que todavía no existen.

---

## Referencias

- [`mvp.md`](./mvp.md) — estado del producto en la beta.
- [`roadmap.md`](./roadmap.md) — R2 (auth) como punto de revisión del canal.

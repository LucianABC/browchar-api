import fs from 'node:fs/promises';
import path from 'node:path';
import { templateDefinitionSchema } from '@tpklabs/browchar-contracts';

/**
 * Valida la data de seed (`data/**`):
 * - todo .json debe parsear;
 * - los playbooks (todo .json bajo `data/playbooks/` con clave `template`)
 *   deben además conformar `templateDefinitionSchema` del contrato (DEV-202).
 *   Antes esto era solo JSON.parse: un typo en un `type` no rompía nada —
 *   `buildTemplateSchema` ignora tipos desconocidos y ese campo quedaba sin
 *   validar en silencio.
 *
 * Requiere el paquete compilado: `npm run contracts:build` (en CI ya corre
 * antes de este script).
 */

async function getJsonFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getJsonFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith('.json')) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

function isPlaybookFile(filePath: string, parsed: unknown): boolean {
  const underPlaybooks = filePath
    .split(path.sep)
    .some((segment) => segment === 'playbooks');
  return (
    underPlaybooks &&
    typeof parsed === 'object' &&
    parsed !== null &&
    'template' in parsed
  );
}

async function main() {
  const dataDir = path.join(process.cwd(), 'data');
  const jsonFiles = await getJsonFiles(dataDir);

  let hasErrors = false;

  for (const filePath of jsonFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed: unknown = JSON.parse(content);

      if (isPlaybookFile(filePath, parsed)) {
        const template = (parsed as { template: unknown }).template;
        const result = templateDefinitionSchema.safeParse(template);
        if (!result.success) {
          hasErrors = true;
          console.error(`❌ ${filePath} — template no conforma el contrato:`);
          for (const issue of result.error.issues) {
            console.error(
              `   template.${issue.path.join('.')}: ${issue.message}`,
            );
          }
          continue;
        }
      }

      console.log(`✅ ${filePath}`);
    } catch (error) {
      hasErrors = true;
      console.error(`❌ ${filePath}`);
      console.error((error as Error).message);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

void main();
